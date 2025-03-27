import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbConnect from '../../../lib/database';
import Document from '../../../models/Document';
import { generateFileHash } from '../../../lib/hashUtils';
import { writeFile } from 'fs/promises';
import path from 'path';
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
    
    await dbConnect();
    
    // For handling form data with uploaded files
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Get other form fields
    const title = formData.get('title');
    const documentType = formData.get('documentType');
    const description = formData.get('description');
    const relatedLand = formData.get('relatedLand');
    
    if (!title || !documentType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create a unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}_${timestamp}.${fileExt}`;
    
    // Path where files will be stored
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);
    
    // Convert file to buffer and generate hash
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileHash = generateFileHash(buffer);
    
    // Save file to disk
    await writeFile(filePath, buffer);
    
    // Create document record in database
    const newDocument = new Document({
      title,
      documentType,
      description,
      fileUrl: `/uploads/${fileName}`,
      fileHash,
      fileSize: file.size,
      mimeType: file.type,
      uploadedBy: session.user.id,
      relatedLand: relatedLand || null,
      verificationStatus: {
        isVerified: false,
        verificationMethod: 'hash_verification'
      }
    });
    
    await newDocument.save();
    
    // Add document to related land if specified
    if (relatedLand) {
      const Land = require('../../../models/Land').default;
      await Land.findByIdAndUpdate(relatedLand, {
        $push: { documents: newDocument._id }
      });
    }
    
    return NextResponse.json(
      {
        message: 'Document uploaded successfully',
        documentId: newDocument._id,
        fileUrl: newDocument.fileUrl,
        fileHash: newDocument.fileHash
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const url = new URL(req.url);
    const landId = url.searchParams.get('landId');
    const documentId = url.searchParams.get('documentId');
    
    let query = {};
    
    if (documentId) {
      // Get specific document
      query = { _id: documentId };
    } else if (landId) {
      // Get documents for a land
      query = { relatedLand: landId };
    } else {
      // Get documents uploaded by the user
      query = { uploadedBy: session.user.id };
    }
    
    // Check user's access rights
    if (documentId || landId) {
      // If not admin, check if user has access to view the document
      if (session.user.role !== 'admin') {
        const hasAccess = await Document.exists({
          ...query,
          $or: [
            { uploadedBy: session.user.id },
            { 'accessControl.isPublic': true },
            { 'accessControl.authorizedUsers': session.user.id },
            { 'accessControl.authorizedRoles': session.user.role }
          ]
        });
        
        if (!hasAccess) {
          return NextResponse.json(
            { message: 'Access denied' },
            { status: 403 }
          );
        }
      }
    }
    
    // Fetch documents
    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email')
      .populate('verificationStatus.verifiedBy', 'name email');
    
    return NextResponse.json(
      { documents },
      { status: 200 }
    );
  } catch (error) {
    console.error('Document fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
