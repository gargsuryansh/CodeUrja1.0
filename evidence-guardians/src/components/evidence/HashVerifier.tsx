
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const HashVerifier = () => {
  const [fileHash, setFileHash] = useState('');
  const [storedHash, setStoredHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<'verified' | 'failed' | null>(null);
  const [verifying, setVerifying] = useState(false);
  
  const verifyHash = () => {
    if (!fileHash || !storedHash) {
      toast.error("Please enter both hash values");
      return;
    }
    
    setVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const result = fileHash === storedHash ? 'verified' : 'failed';
      setVerificationResult(result);
      setVerifying(false);
      
      if (result === 'verified') {
        toast.success("Hash verification successful!", {
          description: "The evidence has not been tampered with.",
        });
      } else {
        toast.error("Hash verification failed!", {
          description: "The evidence may have been tampered with.",
        });
      }
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Evidence Integrity Verifier</CardTitle>
        <CardDescription>
          Verify the integrity of evidence using SHA-256 hash verification.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stored-hash">Stored Hash</Label>
          <Input
            id="stored-hash"
            placeholder="Enter the original hash from the system"
            value={storedHash}
            onChange={(e) => setStoredHash(e.target.value)}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file-hash">Current File Hash</Label>
          <Input
            id="file-hash"
            placeholder="Enter the current file hash"
            value={fileHash}
            onChange={(e) => setFileHash(e.target.value)}
            className="font-mono text-sm"
          />
        </div>
        
        {verificationResult && (
          <div 
            className={`mt-4 p-3 rounded-md flex items-center gap-2 ${
              verificationResult === 'verified' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' 
                : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
            }`}
          >
            {verificationResult === 'verified' ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Verification Successful</p>
                  <p className="text-sm">The evidence is intact and has not been tampered with.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Verification Failed</p>
                  <p className="text-sm">The evidence may have been modified or corrupted.</p>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={verifyHash} 
          className="w-full" 
          disabled={verifying}
        >
          {verifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Integrity"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HashVerifier;
