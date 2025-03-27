'use client';

import SignUpForm from '../../components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
