import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated, admin } = useAuth();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (!admin || admin.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute; 