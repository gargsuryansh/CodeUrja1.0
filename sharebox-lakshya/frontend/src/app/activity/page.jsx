"use client";
import React, { useState, useEffect } from 'react';
import {
  Download,
  Upload,
  Share2,
  Search,
  Filter,
  ArrowDownToLine,
  Clock,
  MoreVertical
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';
import API from '../../utils/api';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Simulated data fetch
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Simulating API response with provided JSON
        const response = await API.get('/api/activity');
        if (response.status !== 200) {
          throw new Error(`Failed to fetch activities: ${response.statusText}`);
        }

        setActivities(response.data.activities.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Get icon based on status
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'download':
        return <ArrowDownToLine className="w-5 h-5 text-blue-600" />;
      case 'upload':
        return <Upload className="w-5 h-5 text-green-600" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'download':
        return 'bg-blue-50 text-blue-600';
      case 'upload':
        return 'bg-green-50 text-green-600';
      case 'share':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  // Filter activities
  const filteredActivities = activities
    .filter(activity =>
      activity.fileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || activity.status.toLowerCase() === filterStatus.toLowerCase())
    );

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Activity Logs</h2>
            <div className="flex items-center space-x-2">
              <button className="hover:bg-gray-100 p-2 rounded-full">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Activities</option>
              <option value="upload">Uploads</option>
              <option value="download">Downloads</option>
              <option value="share">Shares</option>
            </select>
          </div>
        </div>

        {/* Activities List */}
        <div className="divide-y divide-gray-100">
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No activities found
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  {/* Status Icon */}
                  <div className={`p-2.5 rounded-full ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>

                  {/* Activity Details */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-800">{activity.fileName}</p>
                      <span
                        className={`
                          px-2 py-0.5 rounded-full text-xs font-medium
                          ${getStatusColor(activity.status)}
                        `}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                      <Clock className="w-4 h-4 mr-1 inline-block" />
                      {activity.createdDate ? new Date(activity.createdDate).toLocaleString() : 'No date'}
                    </p>
                  </div>
                </div>

                {/* More Options */}
                <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredActivities.length > 0 && (
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredActivities.length} of {activities.length} activities
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ActivityLog;
