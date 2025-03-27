import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LandDetails from '../land/LandDetails';

const VerificationPortal = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('surveyNumber');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [landData, setLandData] = useState(null);
  const [requestHistory, setRequestHistory] = useState([]);
  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationReport, setVerificationReport] = useState(null);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery) {
      setError('Please enter a search term');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setLandData(null);
    setVerificationReport(null);
    
    try {
      const response = await fetch(`/api/land/search?type=${searchType}&query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Search failed');
      }
      
      if (data.land) {
        setLandData(data.land);
        
        // Add to request history if not already there
        setRequestHistory(prev => {
          if (!prev.some(item => item.id === data.land._id)) {
            return [
              {
                id: data.land._id,
                surveyNumber: data.land.surveyNumber,
                query: searchQuery,
                timestamp: new Date().toISOString()
              },
              ...prev.slice(0, 9) // Keep only last 10 items
            ];
          }
          return prev;
        });
      } else {
        setError('No records found matching your search criteria');
      }
    } catch (err) {
      setError(err.message || 'Failed to perform search. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateReport = async () => {
    if (!landData) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/verification/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          landId: landData._id,
          verifierUserId: session?.user?.id,
          verifierRole: session?.user?.role,
          purpose: 'loan_verification'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate verification report');
      }
      
      setVerificationReport(data.report);
      setVerificationMode(true);
    } catch (err) {
      setError(err.message || 'Failed to generate report. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRequestAccess = async () => {
    if (!landData) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/verification/request-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          landId: landData._id,
          requesterId: session?.user?.id,
          requesterRole: session?.user?.role,
          purpose: 'mortgage_verification',
          accessDuration: 7 // days
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to request access');
      }
      
      // Show success message
      alert('Access request sent to the land owner. You will be notified when approved.');
    } catch (err) {
      setError(err.message || 'Failed to request access. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">Land Record Verification Portal</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-4">
          <div className="flex-1 min-w-[250px]">
            <Input
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search query"
            />
          </div>
          
          <div className="w-48">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search type"
            >
              <option value="surveyNumber">Survey Number</option>
              <option value="khasraNumber">Khasra Number</option>
              <option value="owner">Owner Name</option>
              <option value="address">Address</option>
            </select>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
        
        {requestHistory.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey No.</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Query</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requestHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">{item.surveyNumber}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">{item.query}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-right">
                        <button
                          onClick={() => setSearchQuery(item.surveyNumber)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Search Again
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
      
      {landData && (
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Land Record Details</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleRequestAccess}
                  disabled={isLoading}
                >
                  Request Full Access
                </Button>
                <Button
                  onClick={handleGenerateReport}
                  disabled={isLoading || verificationMode}
                >
                  Generate Verification Report
                </Button>
              </div>
            </div>
            
            {/* Land Details Component */}
            <LandDetails land={landData} />
          </Card>
          
          {verificationMode && verificationReport && (
            <Card>
              <h3 className="text-lg font-bold mb-4">Verification Report</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Ownership Status</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Current owner matches the land records. The property is {verificationReport.ownership.hasDisputes ? 'under dispute' : 'clear of disputes'}.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Document Status</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>All documents are {verificationReport.documents.verified ? 'verified and authentic' : 'pending verification'}. {verificationReport.documents.count} documents are attached to this record.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Encumbrances</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>{verificationReport.encumbrances.count > 0 ? `There are ${verificationReport.encumbrances.count} active encumbrances on this property.` : 'The property is free from encumbrances.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium mb-2">Verification Summary</h3>
                  <div className="text-sm">
                    <p className="mb-2"><strong>Verification ID:</strong> {verificationReport.verificationId}</p>
                    <p className="mb-2"><strong>Generated On:</strong> {new Date(verificationReport.timestamp).toLocaleString()}</p>
                    <p className="mb-2"><strong>Verified By:</strong> {verificationReport.verifierName}</p>
                    <p className="mb-2"><strong>Valid Until:</strong> {new Date(verificationReport.validUntil).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {' '}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        verificationReport.status === 'approved' ? 'bg-green-100 text-green-800' :
                        verificationReport.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {verificationReport.status === 'approved' ? 'Approved' :
                         verificationReport.status === 'pending' ? 'Pending' : 'Rejected'}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => window.print()}>
                    Print Report
                  </Button>
                  <Button onClick={() => setVerificationMode(false)}>
                    Close Report
                  </Button>
                </div>
              </div>
            </Card>
