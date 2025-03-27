import React from 'react';
import { useSession } from 'next-auth/react';

const LandDetails = ({ land }) => {
  const { data: session } = useSession();
  
  if (!land) {
    return <div>No land details available</div>;
  }
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Check if user is an owner of this land
  const isOwner = land.owners?.some(owner => 
    owner.userId && owner.userId === session?.user?.id
  );
  
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Land Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Survey Number: {land.surveyNumber}
          </p>
        </div>
        
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Khasra Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{land.khasraNumber || 'N/A'}</dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Area</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {land.area} {land.areaUnit}
              </dd>
            </div>
            
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Land Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {land.landType.replace('_', ' ')}
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {land.location.address}, {land.location.district}, {land.location.state}
                {land.location.pincode && ` - ${land.location.pincode}`}
              </dd>
            </div>
            
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 sm:mt-0 sm:col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  land.status === 'active' ? 'bg-green-100 text-green-800' :
                  land.status === 'under_dispute' ? 'bg-red-100 text-red-800' :
                  land.status === 'mutation_in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {land.status.replace('_', ' ').charAt(0).toUpperCase() + land.status.replace('_', ' ').slice(1)}
                </span>
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(land.createdAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Ownership Information */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Ownership Information</h3>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Current Owners</h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ownership %
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Since
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {land.owners && land.owners.map((owner, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {owner.ownerName}
                      {owner.userId && owner.userId === session?.user?.id && 
                        <span className="ml-1 text-xs text-blue-600">(You)</span>
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {owner.ownershipPercentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(owner.ownershipStartDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {owner.userId && owner.userId.aadhaarVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {land.previousOwners && land.previousOwners.length > 0 && (
            <>
              <h4 className="text-md font-medium text-gray-900 mt-8 mb-4">Previous Owners</h4>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ownership %
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {land.previousOwners.map((owner, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {owner.ownerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {owner.ownershipPercentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(owner.ownershipStartDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(owner.ownershipEndDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Attached Documents */}
      {land.documents && land.documents.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Documents</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {land.documents.map((doc, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">{doc.title}</h4>
                      <p className="text-sm text-gray-500 capitalize">{doc.documentType.replace('_', ' ')}</p>
                      {doc.description && (
                        <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Uploaded on {formatDate(doc.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.verificationStatus && doc.verificationStatus.isVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.verificationStatus && doc.verificationStatus.isVerified ? 'Verified' : 'Pending'}
                      </span>
                      
                      <a 
                        href={doc.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Transaction History */}
      {land.transactionHistory && land.transactionHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Transaction History</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {land.transactionHistory.map((transaction, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full ${
                      transaction.transactionType === 'registration' ? 'bg-green-600' :
                      transaction.transactionType === 'mutation' ? 'bg-blue-600' :
                      transaction.transactionType === 'mortgage' ? 'bg-purple-600' :
                      'bg-gray-600'
                    }`}></div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {transaction.transactionType.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(transaction.date)}
                      </p>
                      
                      {transaction.parties && transaction.parties.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Involved parties:</p>
                          <ul className="mt-1 text-xs text-gray-500">
                            {transaction.parties.map((party, idx) => (
                              <li key={idx} className="inline-block mr-2">
                                {party.party && party.party.name ? party.party.name : 'Unknown'} 
                                {party.role && <span className="text-gray-400"> ({party.role})</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandDetails;
