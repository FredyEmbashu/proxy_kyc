import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Login from '../components/Auth/Login';
import ClientDashboard from '../components/Client/ClientDashboard';
import BusinessDashboard from '../components/Business/BusinessDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';
import PersonalInfo from '../components/KYC/PersonalInfo';
import DocumentUpload from '../components/KYC/DocumentUpload';
import FaceCapture from '../components/KYC/FaceCapture';

// Placeholder for VerificationComplete
const VerificationComplete = () => <div>Verification Complete</div>;

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Client Verification Steps (accessible to all) */}
      <Route path="/verify/personal" element={<Layout><PersonalInfo /></Layout>} />
      <Route path="/verify/documents" element={<Layout><DocumentUpload /></Layout>} />
      <Route path="/verify/face" element={<Layout><FaceCapture onCapture={async (image) => {}} /></Layout>} />
      <Route path="/verify/complete" element={<Layout><VerificationComplete /></Layout>} />

      {/* Dashboards (open access) */}
      <Route path="/business" element={<Layout><BusinessDashboard /></Layout>} />
      <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="/" element={<Layout><ClientDashboard /></Layout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
