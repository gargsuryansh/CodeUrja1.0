import React from 'react';
import {
  User,
  Phone,
  MapPin,
  Landmark,
  CheckCircle2,
  XCircle,
  Edit2,
  Building2,
  Scale,
  Mail,
  Shield,
} from 'lucide-react';

const UserProfile = ({ user, setTab }) => {
  // Use actual user data with fallbacks
  const userData = {
    username: user?.username ,
    image: user?.profileImage ,
    email: user?.email ,
    role: user?.role ,
    phone: user?.phone ,
    address: user?.address ,
    status: user?.status  ,
    landParcels: user?.landParcels || [
      {
        id: 'LP001',
        location: 'Farmington, ST',
        size: 150,
        ownershipType: 'Private',
        status: 'Active',
      },
      {
        id: 'LP002',
        location: 'Riverside, ST',
        size: 75,
        ownershipType: 'Lease',
        status: 'Pending',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center shadow-inner">
              <img src={userData.image} alt="User" className="w-full h-full object-cover rounded-full" />
            </div>
            <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {userData.username}
              </h2>
              {userData.status === 'Verified' ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {userData.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <Phone className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
              <p className="text-gray-900 dark:text-white font-medium">{userData.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <MapPin className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
              <p className="text-gray-900 dark:text-white font-medium">{userData.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Land Parcels Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Land Parcels
          </h3>
          <button
            onClick={() => setTab('settings')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            <Edit2 className="w-4 h-4" />
            <span>Manage Parcels</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userData.landParcels.map((parcel) => (
            <div
              key={parcel.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Landmark className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {parcel.id}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    parcel.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {parcel.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {parcel.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Scale className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {parcel.size} Acres
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {parcel.ownershipType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


