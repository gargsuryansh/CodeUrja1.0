import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Sun, Moon, User, Mail, Phone, Link, FileText, Briefcase } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { notificationService } from "../../services/notificationService";

const GeneralSettings = ({ user, function: setCurrentUser }) => {
  const { updateUser, checkAuth } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const initialFormData = useMemo(() => ({
    username: user?.username || "",
    email: user?.email || "",
    _id: user?._id,
    phoneNumber: user?.phoneNumber || "",
    githubUrl: user?.githubUrl || "",
    facebookUrl: user?.facebookUrl || "",
    instagramUrl: user?.instagramUrl || "",
    profileImage: null,
    discription: user?.discription || "",
    profession: user?.profession || "",
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const updatedUser = await updateUser(formData);
        setCurrentUser(updatedUser);
        toast.success('Profile updated successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        await notificationService.postNotifications({
          id: user._id,
          type: 'success',
          title: 'Profile updated',
          message: 'Profile updated successfully',
          timestamp: new Date().toISOString(),
          read: false,
          icon: 4,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error('Failed to update profile', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    },
    [updateUser, formData, user._id, setCurrentUser]
  );

  const renderInputField = (field, icon, label) => (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {icon}
        <span>{label}</span>
      </label>
      <input
        type="text"
        name={field}
        value={formData[field]}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Personal Information
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInputField("username", <User className="w-5 h-5" />, "Username")}
            {renderInputField("email", <Mail className="w-5 h-5" />, "Email")}
            {renderInputField("phoneNumber", <Phone className="w-5 h-5" />, "Phone Number")}
            {renderInputField("profession", <Briefcase className="w-5 h-5" />, "Profession")}
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FileText className="w-5 h-5" />
              <span>Description</span>
            </label>
            <textarea
              name="discription"
              value={formData.discription}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Link className="w-5 h-5" />
              <span>Social Links</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderInputField("githubUrl", <Link className="w-5 h-5" />, "GitHub")}
              {renderInputField("facebookUrl", <Link className="w-5 h-5" />, "Facebook")}
              {renderInputField("instagramUrl", <Link className="w-5 h-5" />, "Instagram")}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <User className="w-5 h-5" />
              <span>Profile Image</span>
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Preferences
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Theme</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customize your interface theme</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-lg bg-white dark:bg-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl opacity-50 cursor-not-allowed">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your email preferences
              </p>
            </div>
            <label className="relative inline-flex items-center">
              <input type="checkbox" className="sr-only peer" disabled />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default GeneralSettings;
