import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbConnect from '../../../lib/database';
import Land from '../../../models/Land';
import Document from '../../../models/Document';
import User from '../../../models/User';
import { verifyFileHash } from '../../../lib/hashUtils';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user has verification role
    if (!['admin', 'verifier', 'bank'].includes(session.user.role)) {
      return NextResponse.json(
        { message: 'Access denied: Insufficient permissions' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const url = new URL(req.url);
    const path = url.pathname.split('/');
    const action = path[path.length - 1];
    
    const data = await req.json();
    
    // Handle different verification actions
    if (action === 'generate-report') {
      return await generateVerificationReport(data, session);
    } else if (action === 'request-access') {
      return await requestVerificationAccess(data, session);
    } else if (action === 'verify-document') {
      return await verifyDocument(data, session);
    } else {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateVerificationReport(data, session) {
  const { landId, verifierUserId, verifierRole, purpose } = data;
  
  if (!landId) {
    return NextResponse.json(
      { message: 'Missing land ID' },
      { status: 400 }
    );
  }
  
  // Fetch land record with all related data
  const land = await Land.findById(landId)
    .populate('owners.userId', 'name email aadhaarVerified')
    .populate('documents')
    .populate('encumbrances.holderId', 'name role')
    .populate('encumbrances.documentRef');
  
  if (!land) {
    return NextResponse.json(
      { message: 'Land record not found' },
      { status: 404 }
    );
  }
  
  // Generate verification report
  const verificationId = `VR-${uuidv4().substring(0, 8)}`;
  const timestamp = new Date().toISOString();
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30); // Valid for 30 days
  
  // Check document verification status
  const allDocsVerified = land.documents.length > 0 && 
    land.documents.every(doc => doc.verificationStatus && doc.verificationStatus.isVerified);
  
  // Count active encumbrances
  const activeEncumbrances = land.encumbrances.filter(
    enc => !enc.endDate || new Date(enc.endDate) > new Date()
  );
  
  const report = {
    verificationId,
    timestamp,
    validUntil: validUntil.toISOString(),
    verifierId: session.user.id,
    verifierName: session.user.name,
    verifierRole: session.user.role,
    landId: land._id,
    surveyNumber: land.surveyNumber,
    purpose,
    status: 'approved',
    ownership: {
      currentOwners: land.owners.map(owner => ({
        name: owner.ownerName,
        percentage: owner.ownershipPercentage,
        verified: owner.userId ? owner.userId.aadhaarVerified : false
      })),
      hasDisputes: land.status === 'under_dispute'
    },
    documents: {
      count: land.documents.length,
      verified: allDocsVerified
    },
    encumbrances: {
      count: activeEncumbrances.length,
      details: activeEncumbrances.map(enc => ({
        type: enc.type,
        description: enc.description,
        holderName: enc.holderName,
        startDate: enc.startDate,
        endDate: enc.endDate
      }))
    }
  };
  
  // Record this verification in the land's transaction history
  await Land.findByIdAndUpdate(landId, {
    $push: {
      transactionHistory: {
        transactionType: 'verification',
        date: new Date(),
        description: `Verification report generated for ${purpose}`,
        parties: [{
          party: session.user.id,
          role: session.user.role
        }]
      }
    }
  });
  
  return NextResponse.json(
    { report },
    { status: 200 }
  );
}

async function requestVerificationAccess(data, session) {
  const { landId, requesterId, requesterRole, purpose, accessDuration } = data;
  
  if (!landId) {
    return NextResponse.json(
      { message: 'Missing land ID' },
      { status: 400 }
    );
  }
  
  // Fetch land to get owner information
  const land = await Land.findById(landId).populate('owners.userId', 'email');
  
  if (!land) {
    return NextResponse.json(
      { message: 'Land record not found' },
      { status: 404 }
    );
  }
  
  // Get owner emails for notification (in a real app, this would send emails)
  const ownerEmails = land.owners.map(owner => 
    owner.userId ? owner.userId.email : null
  ).filter(Boolean);
  
  // Record the access request
  const requestId = `REQ-${uuidv4().substring(0, 8)}`;
  
  // In a real application, this would store the request in a database
  // and trigger notifications to the owners
  console.log(`Access request ${requestId} created for land ${landId}`);
  console.log(`Owners to notify: ${ownerEmails.join(', ')}`);
  
  return NextResponse.json(
    { 
      message: 'Access request submitted successfully', 
      requestId,
      status: 'pending'
    },
    { status: 200 }
  );
}

async function verifyDocument(data, session) {
  const { documentId, verificationMethod } = data;
  
  if (!documentId) {
    return NextResponse.json(
      { message: 'Missing document ID' },
      { status: 400 }
    );
  }
  
  // Fetch document
  const document = await Document.findById(documentId);
  
  if (!document) {
    return NextResponse.json(
      { message: 'Document not found' },
      { status: 404 }
    );
  }
  
  // Update document verification status
  document.verificationStatus = {
    isVerified: true,
    verifiedBy: session.user.id,
    verificationDate: new Date(),
    verificationMethod: verificationMethod || 'manual_verification'
  };
  
  // Add to transaction history
  document.transactionHistory.push({
    action: 'verified',
    performedBy: session.user.id,
    timestamp: new Date(),
    details: `Verified using ${verificationMethod || 'manual_verification'}`
  });
  
  await document.save();
  
  // If document is attached to land, update land's transaction history
  if (document.relatedLand) {
    await Land.findByIdAndUpdate(document.relatedLand, {
      $push: {
        transactionHistory: {
          transactionType: 'document_verification',
          date: new Date(),
          description: `Document "${document.title}" verified`,
          parties: [{
            party: session.user.id,
            role: 'verifier'
          }],
          documentRef: document._id
        }
      }
    });
  }
  
  return NextResponse.json(
    { 
      message: 'Document verified successfully', 
      documentId: document._id,
      verificationStatus: document.verificationStatus
    },
    { status: 200 }
  );
}