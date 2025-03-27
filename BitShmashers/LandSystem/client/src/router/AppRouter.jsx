import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/layout/navbar/Navbar';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from '../components/auth/AdminRoute';
import Loader from '../components/ui/Loader';
import { useAuth } from '../context/AuthContext';

// Lazy Load Pages
const Hero = lazy(() => import('../pages/Hero'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminRegister = lazy(() => import('../pages/admin/AdminRegister'));
const ProfilePage = lazy(() => import('../pages/nav/ProfilePage'));
const NotificationPage = lazy(() => import('../pages/nav/NotificationPage'));

const About = lazy(() => import('../components/layout/footer/footerLinks/About'));
const ContactPage = lazy(() => import('../pages/contactPages/ContactPage'));
const SearchUserPage = lazy(() => import('../pages/contactPages/SearchUserPage'));
const SearchedUserPage = lazy(() => import('../pages/contactPages/SearchedUserPage'));
const ServicesPage = lazy(() => import('../pages/nav/ServicesPage'));
const PageNotFound = lazy(() => import('../components/subComponents/PageNoteFound'));
const Property = lazy(() => import('../pages/nav/Property'));
const RegisterLand = lazy(() => import('../pages/nav/RegisterLand'));
const VerifyLand = lazy(() => import('../pages/nav/VerifyLand'));
const Dashboard = lazy(() => import('../pages/nav/Dashboard'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminLandRecords = lazy(() => import('../pages/admin/AdminLandRecords'));
const AdminVerifyRequests = lazy(() => import('../pages/admin/AdminVerifyRequests'));

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<DashboardLayout><Hero /></DashboardLayout>} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <DashboardLayout><AdminDashboard /></DashboardLayout>
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminRoute>
                <DashboardLayout><AdminUsers /></DashboardLayout>
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/land-records" 
            element={
              <AdminRoute>
                <DashboardLayout><AdminLandRecords /></DashboardLayout>
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/verify-requests" 
            element={
              <AdminRoute>
                <DashboardLayout><AdminVerifyRequests /></DashboardLayout>
              </AdminRoute>
            } 
          />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <DashboardLayout><Dashboard /></DashboardLayout> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <ProtectedRoute><ProfilePage /></ProtectedRoute> : <Navigate to="/login" />} 
          />
          <Route path="/notification" element={<NotificationPage />} />
         

          {/* Other routes */}
          <Route path="/about" element={<DashboardLayout><About /></DashboardLayout>} />
          <Route path="/contact" element={<DashboardLayout><ContactPage /></DashboardLayout>} />
          <Route path="/search" element={<DashboardLayout><SearchUserPage /></DashboardLayout>} />
          <Route path="/search/:username" element={<SearchedUserPage />} />
          <Route path="/services" element={<DashboardLayout><ServicesPage /></DashboardLayout>} />
          <Route path="/properties" element={<DashboardLayout><Property /></DashboardLayout>} />
          <Route path="/register-land" element={<ProtectedRoute><DashboardLayout><RegisterLand /></DashboardLayout></ProtectedRoute>} />
          <Route path="/verify-land" element={<ProtectedRoute><DashboardLayout><VerifyLand /></DashboardLayout></ProtectedRoute>} />
          {/* 404 route */}
          <Route path="*" element={<DashboardLayout><div className="flex items-center justify-center min-h-screen"><PageNotFound /></div></DashboardLayout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
