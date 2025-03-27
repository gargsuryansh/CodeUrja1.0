import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DocumentViewer = ({ document }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!document) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No document selected</p>
      </Card>
    );
  }

  const handleVerifyDocument = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/verification/verify-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: document._id,
          verificationMethod: 'hash_verification',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Document verification failed');
      }
      
      setSuccess('Document verified successfully!');
      // Refresh the document or show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to verify document');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine the document file type and render appropriately
  const getDocumentType = () => {
    const mimeType = document.mimeType || '';
    
    if (mimeType.includes('image')) {
      return 'image';
    } else if (mimeType.includes('pdf')) {
      return 'pdf';
    } else {
      return 'other';
    }
  };

  const documentType = getDocumentType();
  const canVerify = session?.user?.role === 'admin' || session?.user?.role === 'verifier';

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-500 capitalize">{document.documentType.replace('_', ' ')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            document.verificationStatus && document.verificationStatus.isVerified 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {document.verificationStatus && document.verificationStatus.isVerified ? 'Verified' : 'Pending Verification'}
          </span>
        </div>
      </div>
      
      {(error || success) && (
        <div className={`p-4 ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {error || success}
        </div>
      )}
      
      <div className="p-6">
        {document.description && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p className="text-sm text-gray-600">{document.description}</p>
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Document Details</h4>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">File Hash</p>
                <p className="text-sm font-mono break-all">{document.fileHash}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Uploaded By</p>
                <p className="text-sm">{document.uploadedBy?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Upload Date</p>
                <p className="text-sm">{new Date(document.createdAt).toLocaleString()}</p>
                </div>
              <div>
                <p className="text-xs text-gray-500">File Size</p>
                <p className="text-sm">{(document.fileSize / 1024).toFixed(2)} KB</p>
              </div>
              {document.verificationStatus && document.verificationStatus.isVerified && (
                <>
                  <div>
                    <p className="text-xs text-gray-500">Verified By</p>
                    <p className="text-sm">{document.verificationStatus.verifiedBy?.name || 'System'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Verification Date</p>
                    <p className="text-sm">{new Date(document.verificationStatus.verificationDate).toLocaleDateString()}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden mb-6">
          {documentType === 'image' && (
            <img src={document.fileUrl} alt={document.title} className="w-full h-auto object-contain" />
          )}
          
          {documentType === 'pdf' && (
            <iframe 
              src={document.fileUrl} 
              className="w-full h-96 border-0" 
              title={document.title}
            />
          )}
          
          {documentType === 'other' && (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Preview not available</p>
              <div className="mt-4">
                <a 
                  href={document.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download File
                </a>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 justify-end">
          <a 
            href={document.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Download
          </a>
          
          {canVerify && !document.verificationStatus?.isVerified && (
            <Button
              onClick={handleVerifyDocument}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Document'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DocumentViewer;

