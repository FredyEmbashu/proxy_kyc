import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import PersonalInfo from './components/KYC/PersonalInfo';
import DocumentUpload from './components/KYC/DocumentUpload';
import FaceCapture from './components/KYC/FaceCapture';
import VerificationComplete from './components/KYC/VerificationComplete';
import Welcome from './components/Welcome/Welcome';
import BusinessDashboard from './components/Business/BusinessDashboard';
import SocialMediaVerification from './components/KYC/SocialMediaVerification';
import WebDataAnalysis from './components/Analysis/WebDataAnalysis';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';
// import ProtectedRoute from './components/Auth/ProtectedRoute';

import RequestVerification from './components/KYC/RequestVerification';

import PricingAndPlans from './components/Billing/PaymentPlans';
import RiskScoring from './components/Analysis/RiskScoring';
import NotificationCenter from './components/Notifications/NotificationCenter';
import DigitalSignature from './components/Security/DigitalSignature';
// import BiometricMatching from './components/Biometrics/BiometricMatching';
import VerificationRequests from './components/Business/VerificationRequests';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import IrisScanning from './components/Biometrics/IrisScanning';
import FingerPrintCapture from './components/Biometrics/FingerPrintCapture';
import VerificationProcess from './pages/VerificationProcess';
// import RequestVerification from './pages/RequestVerification';
import BiometricVerification from './pages/BiometricVerification';

// Additional imports for all routes
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Services from './components/Services/Services';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import MakePayment from './components/Billing/MakePaymen';
// TODO: Implement and import TermsOfService component once created
// import TermsOfService from './components/Legal/TermsOfService';
// import DataProtection from './components/Legal/DataProtection';
//  import Compliance from './components/Legal/Compliance';

// Add this import with your other imports
import DocumentVerificationTest from './pages/DocumentVerificationTest';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const handleBiometricCapture = (data: any) => {
    console.log('Biometric data captured:', data);
    navigate('/risk-scoring');
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/request-verification" element={<RequestVerification />} />
      <Route path="/verify/:verificationId" element={<VerificationProcess />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing-plans" element={<PricingAndPlans />} /> 
      {/* Information Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricingpage" element={<Layout><PricingAndPlans /></Layout>} />
      
      {/* Legal Pages */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      {/* {<Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/data-protection" element={<DataProtection />} />
      <Route path="/compliance" element={<Compliance />} /> } */}
      
      {/* Business Routes */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/business-dashboard" element={<Layout><BusinessDashboard /></Layout>} />
      <Route path="/verification-requests" element={<Layout><VerificationRequests /></Layout>} />
      <Route path="/analytics-dashboard" element={<Layout><AnalyticsDashboard /></Layout>} />
      <Route path="/analytics" element={<Layout><AnalyticsDashboard /></Layout>} />
      
      {/* Verification Process Routes */}
      <Route path="/verify-client" element={<Layout><Dashboard /></Layout>} />
      <Route path="/get-verified" element={<Layout><PersonalInfo /></Layout>} />
      <Route path="/documents" element={<Layout><DocumentUpload /></Layout>} />
      <Route path="/verification-process" element={<Layout><VerificationProcess /></Layout>} />
      
      {/* Biometric Verification Routes */}
      <Route path="/face-verification" element={
        <Layout><FaceCapture onCapture={handleBiometricCapture} /></Layout>
      } />
      <Route path="/iris-scan" element={<Layout><IrisScanning /></Layout>} />
      <Route path="/fingerprint" element={<Layout><FingerPrintCapture /></Layout>} />
      <Route path="/biometric-verification" element={<Layout><BiometricVerification /></Layout>} />
      
      {/* Additional Verification Sources */}
      <Route path="/social-media" element={<Layout><SocialMediaVerification /></Layout>} />
      <Route path="/web-analysis" element={<Layout><WebDataAnalysis /></Layout>} />
      
      {/* Risk Assessment Routes */}
      <Route path="/risk-scoring" element={<Layout><RiskScoring /></Layout>} />
      
      {/* Business Features */}
      <Route path="/payment-plans" element={<Layout><PricingAndPlans /></Layout>} />
      <Route path="/notifications" element={<Layout><NotificationCenter /></Layout>} />
      <Route path="/digital-signature" element={<Layout><DigitalSignature /></Layout>} />
      
      {/* Completion Routes */}
      <Route path="/verification-complete" element={<Layout><VerificationComplete /></Layout>} />
      <Route path="/verification-report/:id" element={<Layout><VerificationComplete /></Layout>} />
      
      {/* Service-specific routes */}
      <Route path="/services/individual-verification" element={<Layout><PersonalInfo /></Layout>} />
      <Route path="/services/business-verification" element={<Layout><BusinessDashboard /></Layout>} />
      <Route path="/services/rapid-verification" element={<Layout><VerificationProcess /></Layout>} />
      <Route path="/services/document-authentication" element={<Layout><DocumentUpload /></Layout>} />
      <Route path="/make-payments" element={<Layout><MakePayment /></Layout>} />

      {/* Redirect Routes */}
      <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 Not Found Route
      <Route path="*" element={<Navigate to="/" replace />} />
       */}
      {/* Test Routes */}
      <Route path="/document-verification-test" element={<Layout><DocumentVerificationTest /></Layout>} />
      <Route path="*" element={<Navigate to="/Welcome" replace />} />
    </Routes>
  );
};

export default AppRoutes;