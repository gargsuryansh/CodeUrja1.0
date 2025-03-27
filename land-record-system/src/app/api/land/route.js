import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbConnect from '../../../lib/database';
import Land from '../../../models/Land';
import User from '../../../models/User';

// Register a new land
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user is verified with Aadhaar
    if (!session.user.aadhaarVerified) {
      return NextResponse.json(
        { message: 'Aadhaar verification required for land registration' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const data = await req.json();
    const {
      surveyNumber,
      khasraNumber,
      area,
      areaUnit,
      address,
      district,
      state,
      pincode,
      landType,
      ownerName,
      ownershipPercentage,
      boundaries,
      geoLocation,
      userId,
      documents
    } = data;
    
    // Check for required fields
    if (!surveyNumber || !area || !address || !district || !state || !landType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if survey number already exists
    const existingLand = await Land.findOne({ surveyNumber });
    if (existingLand) {
      return NextResponse.json(
        { message: 'Land with this survey number already registered' },
        { status: 400 }
      );
    }
    
    // Create new land record
    const newLand = new Land({
      surveyNumber,
      khasraNumber,
      area,
      areaUnit,
      location: {
        address,
        district,
        state,
        pincode
      },
      landType,
      owners: [{
        userId: userId || session.user.id,
        ownerName: ownerName || session.user.name,
        ownershipPercentage: ownershipPercentage || 100,
        ownershipStartDate: new Date()
      }],
      documents: documents || []
    });
    
    // Add geolocation and boundaries if provided
    if (geoLocation) {
      newLand.geoLocation = geoLocation;
    }
    
    if (boundaries) {
      newLand.boundaries = boundaries;
    }
    
    await newLand.save();
    
    // Add transaction record
    newLand.transactionHistory.push({
      transactionType: 'registration',
      date: new Date(),
      description: 'Initial registration of land',
      parties: [{
        party: session.user.id,
        role: 'buyer'
      }]
    });
    
    await newLand.save();
    
    return NextResponse.json(
      {
        message: 'Land registered successfully',
        landId: newLand._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Land registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get land records
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
    const landId = url.searchParams.get('id');
    const userId = url.searchParams.get('userId');
    const type = url.searchParams.get('type');
    const query = url.searchParams.get('query');
    const district = url.searchParams.get('district');
    const state = url.searchParams.get('state');
    
    let landQuery = {};
    
    // Get specific land by ID
    if (landId) {
      landQuery = { _id: landId };
    }
    // Get lands owned by specific user
    else if (userId) {
      landQuery = { 'owners.userId': userId };
    }
    // Search by various criteria
    else if (type && query) {
      switch (type) {
        case 'surveyNumber':
          landQuery = { surveyNumber: query };
          break;
        case 'khasraNumber':
          landQuery = { khasraNumber: query };
          break;
        case 'owner':
          // This is a more complex query to search by owner name
          landQuery = { 'owners.ownerName': { $regex: query, $options: 'i' } };
          break;
        case 'address':
          landQuery = { 'location.address': { $regex: query, $options: 'i' } };
          break;
        default:
          landQuery = { surveyNumber: query };
      }
    }
    // Filter by location
    else if (district || state) {
      if (district) landQuery['location.district'] = district;
      if (state) landQuery['location.state'] = state;
    }
    // Get lands owned by current user (if no other filters specified)
    else {
      // For regular users, show only their lands
      if (session.user.role === 'user') {
        landQuery = { 'owners.userId': session.user.id };
      }
      // For admin, show all lands
      // For banks and verifiers, default behavior is to show nothing until searched
      else if (session.user.role !== 'admin') {
        return NextResponse.json(
          { lands: [] },
          { status: 200 }
        );
      }
    }
    
    // If looking for a specific land or doing a specific search
    if (landId || (type && query)) {
      // Populate all the related data for detailed view
      const land = await Land.findOne(landQuery)
        .populate('owners.userId', 'name email aadhaarVerified')
        .populate('previousOwners.userId', 'name email')
        .populate('documents')
        .populate('encumbrances.holderId', 'name role')
        .populate('encumbrances.documentRef')
        .populate('transactionHistory.parties.party', 'name email role')
        .populate('transactionHistory.documentRef');
      
      if (!land) {
        return NextResponse.json(
          { message: 'Land record not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { land },
        { status: 200 }
      );
    }
    
    // For list views, return more minimal data
    const lands = await Land.find(landQuery)
      .select('surveyNumber khasraNumber area areaUnit landType location status owners.ownerName geoLocation')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { lands },
      { status: 200 }
    );
  } catch (error) {
    console.error('Land fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
