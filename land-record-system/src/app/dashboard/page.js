'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lands, setLands] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalLands: 0,
    totalArea: 0,
    pendingMutations: 0,
    documentsUploaded: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      // Fetch user's lands
      const fetchData = async () => {
        try {
          setIsLoading(true);
          
          // Fetch lands
          const landsResponse = await fetch('/api/land');
          
          if (!landsResponse.ok) {
            throw new Error('Failed to fetch land data');
          }
          
          const landsData = await landsResponse.json();
          setLands(landsData.lands || []);
          
          // Calculate statistics
          const userLands = landsData.lands || [];
          const totalArea = userLands.reduce((sum, land) => sum + land.area, 0);
          const pendingMutations = userLands.filter(land => land.status === 'mutation_in_progress').length;
          
          // Fetch document count
          const docsResponse = await fetch('/api/documents/count');
          const docsData = await docsResponse.json();
          
          setStats({
            totalLands: userLands.length,
            totalArea,
            pendingMutations,
            documentsUploaded: docsData.count || 0
          });
          
          // Fetch recent transactions
          const transactionsResponse = await fetch('/api/transactions/recent');
          if (transactionsResponse.ok) {
            const transactionsData = await transactionsResponse.json();
            setRecentTransactions(transactionsData.transactions || []);
          }
          
        } catch (err) {
          console.error('Error fetching dashboard data:', err);
          setError('Failed to load dashboard data');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }
  }, [status, router]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {session?.user?.name}. Here's an overview of your land records.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Lands</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalLands}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Area</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalArea} sqm</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Mutations</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.pendingMutations}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-purple-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Documents Uploaded</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.documentsUploaded}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/land-registration">
            <div className="border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Register New Land</h3>
                  <p className="text-xs text-gray-500">Add a new land record to the system</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/land-mutation">
            <div className="border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Transfer Ownership</h3>
                  <p className="text-xs text-gray-500">Initiate land mutation process</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/map-view">
            <div className="border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">View Map</h3>
                  <p className="text-xs text-gray-500">Visualize land parcels</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Lands */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Land Records</h2>
          <Link href="/my-lands" className="text-sm text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>

        {lands.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Survey Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lands.slice(0, 5).map((land) => (
                  <tr key={land._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {land.surveyNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {land.location.address}, {land.location.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {land.area} {land.areaUnit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        land.status === 'active' ? 'bg-green-100 text-green-800' :
                        land.status === 'under_dispute' ? 'bg-red-100 text-red-800' :
                        land.status === 'mutation_in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {land.status.replace('_', ' ').charAt(0).toUpperCase() + land.status.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/land/${land._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      {land.status === 'active' && (
                        <Link href={`/land-mutation?id=${land._id}`} className="text-green-600 hover:text-green-900">
                          Transfer
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-4">You don't have any registered land yet.</p>
            <Link href="/land-registration">
              <Button>Register Your First Land</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
          </div>
          
          <Card>
            <ul className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <li key={transaction._id} className="p-4">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.transactionType === 'registration' ? 'bg-green-100 text-green-600' :
                      transaction.transactionType === 'mutation' ? 'bg-blue-100 text-blue-600' :
                      transaction.transactionType === 'mortgage' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {transaction.transactionType === 'registration' ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : transaction.transactionType === 'mutation' ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {transaction.transactionType.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
