import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  FileText, 
  MapPin, 
  DollarSign, 
  Building2, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  BarChart2,
  User,
  Shield,
  CheckSquare,
  XSquare,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [lands, setLands] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [verificationNotes, setVerificationNotes] = useState({});
  const [rejectionReason, setRejectionReason] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      let endpoint = '';
      switch (activeTab) {
        case 'pending':
          endpoint = 'http://localhost:8001/api/admin/pending-verifications';
          break;
        case 'all':
          endpoint = 'http://localhost:8001/api/admin/all-lands';
          break;
        case 'stats':
          endpoint = 'http://localhost:8001/api/admin/verification-stats';
          break;
        default:
          endpoint = 'http://localhost:8001/api/admin/pending-verifications';
      }

      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (activeTab === 'stats') {
        setStats(data.data);
      } else {
        setLands(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (landId, status) => {
    try {
      const token = localStorage.getItem('token');
      const body = {
        status,
        verificationNotes: verificationNotes[landId] || ''
      };

      if (status === 'rejected') {
        if (!rejectionReason[landId]) {
          setError('Please provide a rejection reason');
          return;
        }
        body.rejectionReason = rejectionReason[landId];
      }

      const response = await fetch(`http://localhost:8001/api/admin/verify-land/${landId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to verify land');
      }

      // Refresh data
      fetchData();
      // Clear verification notes and rejection reason
      setVerificationNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[landId];
        return newNotes;
      });
      setRejectionReason(prev => {
        const newReasons = { ...prev };
        delete newReasons[landId];
        return newReasons;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredLands = lands.filter(land => 
    land.landTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.owner.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.existingRecordId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Manage land ownership claims</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Clock className="w-5 h-5 mr-2" />
              Pending Claims
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Landmark className="w-5 h-5 mr-2" />
              All Claims
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              Statistics
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        {activeTab !== 'stats' && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, location, owner, or record ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'stats' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat._id}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 capitalize">{stat._id}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.count}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getStatusColor(stat._id)}`}>
                    {getStatusIcon(stat._id)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLands.map((land) => (
              <div
                key={land._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{land.landTitle}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(land.status)}`}>
                      {getStatusIcon(land.status)}
                      <span className="ml-1 capitalize">{land.status}</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <User className="w-5 h-5 mr-2" />
                      <span>{land.owner.username}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Shield className="w-5 h-5 mr-2" />
                      <span>Record ID: {land.existingRecordId}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Building2 className="w-5 h-5 mr-2" />
                      <span>{land.landType}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{land.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FileText className="w-5 h-5 mr-2" />
                      <span>{land.area} sq ft</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span>{land.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {land.description && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-2">{land.description}</p>
                    </div>
                  )}

                  {land.status === 'pending' && (
                    <div className="mt-4 space-y-4">
                      <textarea
                        value={verificationNotes[land._id] || ''}
                        onChange={(e) => setVerificationNotes(prev => ({
                          ...prev,
                          [land._id]: e.target.value
                        }))}
                        placeholder="Add verification notes..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="2"
                      />
                      <textarea
                        value={rejectionReason[land._id] || ''}
                        onChange={(e) => setRejectionReason(prev => ({
                          ...prev,
                          [land._id]: e.target.value
                        }))}
                        placeholder="Add rejection reason (required for rejection)..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="2"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleVerification(land._id, 'verified')}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Verify
                        </button>
                        <button
                          onClick={() => handleVerification(land._id, 'rejected')}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XSquare className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {land.verificationNotes && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Verification Notes:</span> {land.verificationNotes}
                      </p>
                    </div>
                  )}

                  {land.rejectionReason && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-red-600">
                        <span className="font-medium">Rejection Reason:</span> {land.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Claimed on {new Date(land.createdAt).toLocaleDateString()}</span>
                    {land.verifiedAt && (
                      <span>Verified on {new Date(land.verifiedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredLands.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Landmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No claims found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {activeTab === 'pending' 
                    ? 'No pending claims at the moment'
                    : 'No claims registered in the system'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 