import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import ForgotPassword from '../components/Auth/ForgotPassword';

import ClientDashboard from '../components/Client/ClientDashboard';
import BusinessDashboard from '../components/Business/BusinessDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';

import PersonalInfo from '../components/KYC/PersonalInfo';
import DocumentUpload from '../components/KYC/DocumentUpload';
import FaceCapture from '../components/KYC/FaceCapture';
import SocialMediaVerification from '../components/KYC/SocialMediaVerification';

import VerificationComplete from '../components/KYC/VerificationComplete';
import VerificationProcess from '../pages/VerificationProcess';
import BiometricVerification from '../pages/BiometricVerification';

import Welcome from '../components/Welcome/Welcome';
import PricingAndPlans from '../components/Pricing/PricingAndPlans';
import MakePayment from '../components/Billing/MakePaymen';

import WebDataAnalysis from '../components/Analysis/WebDataAnalysis';
import RiskScoring from '../components/Analysis/RiskScoring';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import DigitalSignature from '../components/Security/DigitalSignature';

import IrisScanning from '../components/Biometrics/IrisScanning';
import FingerPrintCapture from '../components/Biometrics/FingerPrintCapture';

import Profile from '../components/Profile/Profile';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Services from '../components/Services/Services';
import PrivacyPolicy from '../components/Legal/PrivacyPolicy';

import DocumentVerificationTest from '../pages/DocumentVerificationTest';
import RequestVerification from '../components/KYC/RequestVerification';
import VerificationRequests from '../components/Business/VerificationRequests';
import AnalyticsDashboard from '../components/Analytics/AnalyticsDashboard';
import UserManagement from '../components/Admin/UserManagement';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/pricing-plans" element={<Layout><PricingAndPlans /></Layout>} />
      <Route path="/make-payments" element={<Layout><MakePayment /></Layout>} />

      {/* Info Pages */}
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />

      {/* Client Verification Steps */}
      <Route path="/verify/personal" element={<Layout><PersonalInfo /></Layout>} />
      <Route path="/verify/documents" element={<Layout><DocumentUpload /></Layout>} />
      <Route path="/verify/face" element={<Layout><FaceCapture onCapture={async () => {}} /></Layout>} />
      <Route path="/verify/social-media" element={<Layout><SocialMediaVerification /></Layout>} />
      <Route path="/verify/complete" element={<Layout><VerificationComplete /></Layout>} />
      <Route path="/verification-process" element={<Layout><VerificationProcess /></Layout>} />
      <Route path="/biometric-verification" element={<Layout><BiometricVerification /></Layout>} />

      {/* Biometrics */}
      <Route path="/iris-scan" element={<Layout><IrisScanning /></Layout>} />
      <Route path="/fingerprint" element={<Layout><FingerPrintCapture /></Layout>} />

      {/* Dashboards */}
      <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="/business" element={<Layout><BusinessDashboard /></Layout>} />
      <Route path="/dashboard" element={<Layout><ClientDashboard /></Layout>} />
      <Route path="/" element={<Layout><ClientDashboard /></Layout>} />

      {/* Admin & Business Tools */}
      <Route path="/admin/users" element={<Layout><UserManagement /></Layout>} />
      <Route path="/verification-requests" element={<Layout><VerificationRequests /></Layout>} />
      <Route path="/analytics-dashboard" element={<Layout><AnalyticsDashboard /></Layout>} />
      <Route path="/notifications" element={<Layout><NotificationCenter /></Layout>} />
      <Route path="/digital-signature" element={<Layout><DigitalSignature /></Layout>} />

      {/* Analytics */}
      <Route path="/risk-scoring" element={<Layout><RiskScoring /></Layout>} />
      <Route path="/web-analysis" element={<Layout><WebDataAnalysis /></Layout>} />

      {/* Misc */}
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/request-verification" element={<Layout><RequestVerification /></Layout>} />
      <Route path="/document-verification-test" element={<Layout><DocumentVerificationTest /></Layout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
