import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/database';
import User from '../../../models/User';
import { verifyAadhaar } from '../../../lib/auth';

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    const data = await req.json();
    const { action } = data;

    // Handle user registration
    if (action === 'register') {
      const { name, email, password, phone } = data;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'User with this email already exists' },
          { status: 400 }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'user', // Default role is set to "user"
      });

      await newUser.save();

      return NextResponse.json(
        {
          message: 'User registered successfully',
          userId: newUser._id,
        },
        { status: 201 }
      );
    }

    // Handle Aadhaar verification
    if (action === 'aadhaar-verify') {
      const { aadhaarNumber, otp, userId } = data;

      // Perform Aadhaar verification
      const verificationResult = await verifyAadhaar(aadhaarNumber, otp);

      if (!verificationResult.success) {
        return NextResponse.json(
          { message: verificationResult.message },
          { status: 400 }
        );
      }

      // Update the user with Aadhaar verification status
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          aadhaarVerified: true,
          aadhaarNumber: verificationResult.data.aadhaarLastDigits,
        });
      }

      return NextResponse.json(
        {
          message: 'Aadhaar verification successful',
          data: verificationResult.data,
        },
        { status: 200 }
      );
    }

    // Invalid action
    return NextResponse.json(
      { message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
