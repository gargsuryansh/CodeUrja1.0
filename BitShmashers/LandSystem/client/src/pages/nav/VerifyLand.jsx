import React from 'react';
import { ShieldCheck, MapPin, FileText, Upload, CheckCircle2 } from 'lucide-react';

const VerifyLand = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Land Verification</h1>
          <p className="text-lg text-gray-600">Verify your land documents securely and efficiently</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Document Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Upload className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Drag and drop your documents here</p>
                <p className="text-sm text-gray-500 mt-2">or click to browse</p>
              </div>
            </div>

            {/* Verification Status Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">Verification Status</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Document Review</span>
                    </div>
                    <span className="text-yellow-500">Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Location Verification</span>
                    </div>
                    <span className="text-yellow-500">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Submit for Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyLand;
