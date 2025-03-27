'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Import the mutation form
import LandMutationForm from '../../components/land/LandMutationForm';

export default function LandMutationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

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
        <h1 className="text-3xl font-bold text-gray-900">Land Ownership Transfer</h1>
        <p className="mt-2 text-gray-600">
          Use this form to initiate the process of transferring land ownership to a new owner.
        </p>
      </div>

      <LandMutationForm />
    </div>
  );
}