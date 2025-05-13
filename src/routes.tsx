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

import PricingAndPlans from './components/Pricing/PricingAndPlans';
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
import Profile from './components/Profile/Profile';

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

// Add these imports at the top of your routes.tsx file
import UserManagement from './components/Admin/UserManagement';
// import UserProfile from './components/Admin/UserProfile';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const handleBiometricCapture = (data: any) => {
    console.log('Biometric data captured:', data);
    navigate('/risk-scoring');
  };

  // Wrap components with Layout to ensure consistent navigation
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
      <Route path="/request-verification" element={<RequestVerification />} />
      <Route path="/verify/:verificationId" element={<VerificationProcess />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing-plans" element={<PricingAndPlans />} /> 
      
      {/* Information Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricingpage" element={withLayout(PricingAndPlans)} />
      
      {/* Admin Routes */}
      <Route path="/admin/users" element={withLayout(UserManagement)} />
      {/* <Route path="/admin/users/:userId" element={withLayout(UserProfile)} /> */}
      <Route path="/admin/users/:userId/edit" element={withLayout(Profile)} />
      
      {/* Legal Pages */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      
      {/* Business Routes */}
      <Route path="/dashboard" element={withLayout(Dashboard)} />
      <Route path="/business-dashboard" element={withLayout(BusinessDashboard)} />
      <Route path="/verification-requests" element={withLayout(VerificationRequests)} />
      <Route path="/analytics-dashboard" element={withLayout(AnalyticsDashboard)} />
      <Route path="/analytics" element={withLayout(AnalyticsDashboard)} />
      
      {/* Verification Process Routes */}
      <Route path="/verify-client" element={withLayout(Dashboard)} />
      <Route path="/get-verified" element={withLayout(PersonalInfo)} />
      <Route path="/documents" element={withLayout(DocumentUpload)} />
      <Route path="/verification-process" element={withLayout(VerificationProcess)} />
      
      {/* Biometric Verification Routes */}
      <Route path="/face-verification" element={
        withLayout(FaceCapture, { onCapture: handleBiometricCapture })
      } />
      <Route path="/iris-scan" element={withLayout(IrisScanning)} />
      <Route path="/fingerprint" element={withLayout(FingerPrintCapture)} />
      <Route path="/biometric-verification" element={withLayout(BiometricVerification)} />
      
      {/* Additional Verification Sources */}
      <Route path="/social-media" element={withLayout(SocialMediaVerification)} />
      <Route path="/web-analysis" element={withLayout(WebDataAnalysis)} />
      
      {/* Risk Assessment Routes */}
      <Route path="/risk-scoring" element={withLayout(RiskScoring)} />
      
      {/* Business Features */}
      <Route path="/payment-plans" element={withLayout(PricingAndPlans)} />
      <Route path="/notifications" element={withLayout(NotificationCenter)} />
      <Route path="/digital-signature" element={withLayout(DigitalSignature)} />
      
      {/* Completion Routes */}
      <Route path="/verification-complete" element={withLayout(VerificationComplete)} />
      <Route path="/verification-report/:id" element={withLayout(VerificationComplete)} />
      
      {/* Service-specific routes */}
      <Route path="/services/individual-verification" element={withLayout(PersonalInfo)} />
      <Route path="/services/business-verification" element={withLayout(BusinessDashboard)} />
      <Route path="/services/rapid-verification" element={withLayout(VerificationProcess)} />
      <Route path="/services/document-authentication" element={withLayout(DocumentUpload)} />
      <Route path="/make-payments" element={withLayout(MakePayment)} />

      {/* Redirect Routes */}
      <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
      
      {/* Test Routes */}
      <Route path="/document-verification-test" element={withLayout(DocumentVerificationTest)} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      {/* <Route path="*" element={<Navigate to="/welcome" replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;