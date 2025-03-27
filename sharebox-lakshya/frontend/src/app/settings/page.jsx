"use client";
import React from 'react';
import { Key, Shield, Download } from 'lucide-react';
import MainLayout from '../../components/MainLayout';
import API from '../../utils/api';

const Settings = () => {
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = React.useState(false);

  const toggleTwoFactorAuth = async () => {
    try {
      const response = await API.get('/api/auth/enableTwoStepVerification');

      if (response.status !== 200) {
        throw new Error('Failed to toggle two-factor auth');
      }
      if (response.data.message == "Two-step enabled.") {
        console.log(true);
      } else {
        setIsTwoFactorAuthEnabled(false);
      }

      console.log(response.data);
    } catch (error) {
      console.error('Failed to toggle two-factor auth:', error);

    }
    setIsTwoFactorAuthEnabled(!isTwoFactorAuthEnabled);
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className=" mb-2 text-gray-900">Enhance your account security</p>
            <p className="text-sm  text-gray-900">
              Use an authenticator app to get 2FA codes
            </p>
          </div>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={toggleTwoFactorAuth}>
            {isTwoFactorAuthEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Download className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Encryption Keys</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-gray-900">Manage your encryption keys</p>
            <p className="text-sm  text-gray-900">
              Download or regenerate your encryption keys
            </p>
          </div>
          <div className="space-x-4">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Download Keys
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
