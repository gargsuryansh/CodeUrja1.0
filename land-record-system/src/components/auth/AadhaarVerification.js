import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AadhaarVerification = ({ onVerificationComplete }) => {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const validateAadhaarNumber = (aadhaar) => {
    // Basic validation: 12 digits
    return /^\d{12}$/.test(aadhaar);
  };

  const handleRequestOtp = async () => {
    if (!validateAadhaarNumber(aadhaarNumber)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real application, this would call an API to request OTP
      // For demo purposes, we'll simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpSent(true);
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setError('Please enter the valid OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Make API call to verify OTP
      const response = await fetch('/api/auth/aadhaar-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhaarNumber,
          otp,
          userId: session?.user?.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      // If verification is successful
      setStep(3);
      
      // Notify parent component
      if (onVerificationComplete) {
        onVerificationComplete(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Aadhaar Verification</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {step === 1 && (
        <>
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Please enter your 12-digit Aadhaar number to verify your identity. We'll send an OTP to the mobile number linked with your Aadhaar.
            </p>
            
            <Input
              label="Aadhaar Number"
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              placeholder="Enter 12-digit Aadhaar number"
              maxLength={12}
              required
            />
          </div>
          
          <Button
            onClick={handleRequestOtp}
            disabled={isLoading || !aadhaarNumber}
            fullWidth
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              We've sent an OTP to the mobile number linked with your Aadhaar. Please enter the OTP below to complete verification.
            </p>
            
            <Input
              label="OTP"
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length < 6}
              fullWidth
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              Change Aadhaar Number
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-medium text-gray-900 mb-2">Verification Successful</h3>
          <p className="text-gray-600 mb-4">
            Your Aadhaar has been successfully verified. You can now proceed with land registration and other services.
          </p>
          
          <Button
            onClick={() => {
              if (onVerificationComplete) {
                onVerificationComplete({ success: true });
              }
            }}
          >
            Continue
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AadhaarVerification;
