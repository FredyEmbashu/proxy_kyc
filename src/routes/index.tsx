import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Layout from '../components/Layout/Layout';
import Login from '../components/Auth/Login';
import ClientDashboard from '../components/Client/ClientDashboard';
import BusinessDashboard from '../components/Business/BusinessDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';
import PersonalInfo from '../components/KYC/PersonalInfo';
import DocumentUpload from '../components/KYC/DocumentUpload';
import FaceCapture from '../components/KYC/FaceCapture';
// TODO: Import VerificationComplete component once implemented
const VerificationComplete = () => <div>Verification Complete</div>;

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({ 
  children, 
  role 
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Client Routes */}
      <Route path="/verify" element={
        <ProtectedRoute role="client">
          <Layout>
            <Routes>
              <Route path="personal" element={<PersonalInfo />} />
              <Route path="documents" element={<DocumentUpload />} />
              <Route path="face" element={<FaceCapture onCapture={async (image) => {}} />} />
              <Route path="complete" element={<VerificationComplete />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />

      {/* Business Routes */}
      <Route path="/business" element={
        <ProtectedRoute role="business">
          <Layout>
            <BusinessDashboard />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <Layout>
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Default Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <ClientDashboard />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;