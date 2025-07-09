import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';

import Dashboard from './components/Dashboard/Dashboard';
import BusinessDashboard from './components/Business/BusinessDashboard';
import UserManagement from './components/Admin/UserManagement';
import Profile from './components/Profile/Profile';

import PricingAndPlans from './components/Pricing/PricingAndPlans';
import MakePayment from './components/Billing/MakePaymen';

import RequestVerification from './components/KYC/RequestVerification';
import PersonalInfo from './components/KYC/PersonalInfo';
import DocumentUpload from './components/KYC/DocumentUpload';
import FaceCapture from './components/KYC/FaceCapture';
import VerificationComplete from './components/KYC/VerificationComplete';
import VerificationProcess from './pages/VerificationProcess';
import BiometricVerification from './pages/BiometricVerification';
import IrisScanning from './components/Biometrics/IrisScanning';
import FingerPrintCapture from './components/Biometrics/FingerPrintCapture';
import SocialMediaVerification from './components/KYC/SocialMediaVerification';
import WebDataAnalysis from './components/Analysis/WebDataAnalysis';
import RiskScoring from './components/Analysis/RiskScoring';
import NotificationCenter from './components/Notifications/NotificationCenter';
import DigitalSignature from './components/Security/DigitalSignature';
import VerificationRequests from './components/Business/VerificationRequests';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import DocumentVerificationTest from './pages/DocumentVerificationTest';

import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Services from './components/Services/Services';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const handleBiometricCapture = (data: any) => {
    console.log('Biometric data captured:', data);
    navigate('/risk-scoring');
  };

  const withLayout = (Component: React.ComponentType<any>, props?: any) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/request-verification" element={<RequestVerification />} />
      <Route path="/verify/:verificationId" element={<VerificationProcess />} />

      {/* Info Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Dashboards (open to everyone) */}
      <Route path="/dashboard" element={withLayout(Dashboard)} />
      <Route path="/business-dashboard" element={withLayout(BusinessDashboard)} />
      <Route path="/admin-dashboard" element={withLayout(UserManagement)} />

      {/* User Management & Profile */}
      <Route path="/admin/users" element={withLayout(UserManagement)} />
      <Route path="/admin/users/:userId/edit" element={withLayout(Profile)} />
      <Route path="/profile" element={withLayout(Profile)} />

      {/* Pricing & Billing */}
      <Route path="/pricing-plans" element={withLayout(PricingAndPlans)} />
      <Route path="/payment-plans" element={withLayout(PricingAndPlans)} />
      <Route path="/make-payments" element={withLayout(MakePayment)} />

      {/* Verification Process */}
      <Route path="/get-verified" element={withLayout(PersonalInfo)} />
      <Route path="/documents" element={withLayout(DocumentUpload)} />
      <Route path="/verification-process" element={withLayout(VerificationProcess)} />
      <Route path="/verification-complete" element={withLayout(VerificationComplete)} />
      <Route path="/verification-report/:id" element={withLayout(VerificationComplete)} />

      {/* Biometrics */}
      <Route path="/face-verification" element={withLayout(FaceCapture, { onCapture: handleBiometricCapture })} />
      <Route path="/iris-scan" element={withLayout(IrisScanning)} />
      <Route path="/fingerprint" element={withLayout(FingerPrintCapture)} />
      <Route path="/biometric-verification" element={withLayout(BiometricVerification)} />

      {/* Other verification methods */}
      <Route path="/social-media" element={withLayout(SocialMediaVerification)} />
      <Route path="/web-analysis" element={withLayout(WebDataAnalysis)} />

      {/* Risk, Analysis & Notifications */}
      <Route path="/risk-scoring" element={withLayout(RiskScoring)} />
      <Route path="/notifications" element={withLayout(NotificationCenter)} />
      <Route path="/digital-signature" element={withLayout(DigitalSignature)} />
      <Route path="/verification-requests" element={withLayout(VerificationRequests)} />
      <Route path="/analytics-dashboard" element={withLayout(AnalyticsDashboard)} />
      <Route path="/analytics" element={withLayout(AnalyticsDashboard)} />

      {/* Test Routes */}
      <Route path="/document-verification-test" element={withLayout(DocumentVerificationTest)} />

      {/* Redirects & Catch-All */}
      <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

export default AppRoutes;
