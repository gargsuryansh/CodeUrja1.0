import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/api';
import { notificationService } from '../services/notificationService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const adminToken = localStorage.getItem('adminToken');

      setUser(null);
      setAdmin(null);

      if (adminToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
        try {
          const adminResponse = await api.get('/api/admin/me');
          if (adminResponse.data) {
            setAdmin(adminResponse.data);
            setLoading(false);
            return;
          }
        } catch (adminError) {
          console.error('Admin auth error:', adminError);
          localStorage.removeItem('adminToken');
          delete api.defaults.headers.common['Authorization'];
        }
      }

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await api.get('/api/auth/me');
          if (response.data) {
            setUser(response.data);
          }
        } catch (userError) {
          console.error('User auth error:', userError);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const token = response.data.token;
      const { user } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      // ✅ Send notification after successful login
      await notificationService.postNotifications({
        id: user._id,
        type: 'security',
        title: 'New login detected',
        message: 'A new login was detected from Chrome on Windows.',
        timestamp: new Date().toISOString(),
        read: false,
        icon: 1,
      });

      toast.success('Successfully logged in!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      return false;
    }
  };

  const adminLogin = async (email, password, adminKey) => {
    try {
      const response = await api.post('/api/auth/admin/login', { 
        email, 
        password, 
        adminKey 
      });
      const token = response.data.token;
      const { user } = response.data;

      localStorage.setItem('adminToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAdmin(user);

      // Clear any existing user session when logging in as admin
      localStorage.removeItem('token');
      setUser(null);

      toast.success('Admin successfully logged in!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Admin login failed');
      localStorage.removeItem('adminToken');
      delete api.defaults.headers.common['Authorization'];
      setAdmin(null);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    delete api.defaults.headers.common['Authorization'];
    setAdmin(null);
    toast.success('Admin logged out successfully');
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      toast.success('Successfully registered!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      console.log("Inside update route::::");
  
      const formData = new FormData();
      formData.append("_id", updatedUser._id);
      formData.append("username", updatedUser.username);
      formData.append("email", updatedUser.email);
      formData.append("phoneNumber", updatedUser.phoneNumber);
      formData.append("githubUrl", updatedUser.githubUrl);
      formData.append("facebookUrl", updatedUser.facebookUrl);
      formData.append("instagramUrl", updatedUser.instagramUrl);
      formData.append("discription", updatedUser.discription);
      formData.append("profession", updatedUser.profession);

      if (updatedUser.profileImage) {
        formData.append("profileImage", updatedUser.profileImage);
      }

      const response = await api.put(`/api/auth/uploadDetails/${updatedUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { user } = response.data;
      console.log("User returned by server:", user);
      setUser(user);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const value = {
    user,
    admin,
    loading,
    login,
    adminLogin,
    logout,
    adminLogout,
    register,
    checkAuth,
    updateUser,
    isAuthenticated: !!user,
    isAdminAuthenticated: !!admin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
