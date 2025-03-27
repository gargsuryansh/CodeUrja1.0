'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LandRegistrationForm from '../../components/land/LandRegistrationForm';
import AadhaarVerification from '../../components/auth/AadhaarVerification';
import Card from '../../components/ui/Card';

export default function LandRegistrationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Check if user has Aadhaar verification
  useEffect(() => {
    if (session?.user?.aadhaarVerified) {
      setAadhaarVerified(true);
    }
  }, [session]);

  // Handle successful Aadhaar verification
  const handleVerificationComplete = (data) => {
    setAadhaarVerified(true);
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!session) {
    return null; // This will be briefly shown before redirect happens
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Land Registration</h1>
        <p className="mt-2 text-gray-600">
          Register your land property in the digital land record system.
        </p>
      </div>

      {!aadhaarVerified ? (
        <div className="mb-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Verification Required</h2>
            <p className="mb-4 text-gray-600">
              To register a land record, you need to verify your identity using Aadhaar. This ensures the security and authenticity of land records in our system.
            </p>
            <AadhaarVerification onVerificationComplete={handleVerificationComplete} />
          </Card>
        </div>
      ) : (
        <LandRegistrationForm />
      )}
    </div>
  );
}