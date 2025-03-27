'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import VerificationPortal from '../../components/verification/VerificationPortal';

export default function VerificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Check if user has verification role
  useEffect(() => {
    if (session && !['admin', 'verifier', 'bank'].includes(session.user.role)) {
      router.push('/dashboard');
    }
  }, [session, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user is authenticated and has proper role
  if (!session || !['admin', 'verifier', 'bank'].includes(session.user.role)) {
    return null; // This will be briefly shown before redirect happens
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Land Record Verification</h1>
        <p className="mt-2 text-gray-600">
          Verify land records for loans, mortgages, and other financial services.
        </p>
      </div>

      <VerificationPortal />
    </div>
  );
}