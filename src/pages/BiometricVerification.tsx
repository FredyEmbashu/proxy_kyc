import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button, Container, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FaceCapture from '../components/KYC/FaceCapture';
import DocumentUpload from '../components/KYC/DocumentUpload';
import FaceDocumentVerification from '../components/Biometrics/FaceDocumentVerification';

const BiometricVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [selfieImage, setSelfieImage] = useState<string>('');
  const [documentImage, setDocumentImage] = useState<string>('');
  const [documentType, setDocumentType] = useState<'passport' | 'id_card' | 'drivers_license'>('id_card');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const steps = ['Capture Selfie', 'Upload Document', 'Verification'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSelfieCapture = (image: string) => {
    setSelfieImage(image);
    handleNext();
  };

  const handleDocumentUpload = (image: string, type: 'passport' | 'id_card' | 'drivers_license') => {
    setDocumentImage(image);
    setDocumentType(type);
    handleNext();
  };

  const handleVerificationComplete = (result: any) => {
    setVerificationResult(result);
    // You can navigate to a results page or show results in this component
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <FaceCapture onCapture={handleSelfieCapture} />;
      case 1:
        return <DocumentUpload onUpload={handleDocumentUpload} />;
      case 2:
        return (
          <FaceDocumentVerification
            selfieImage={selfieImage}
            documentImage={documentImage}
            documentType={documentType}
            onVerificationComplete={handleVerificationComplete}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Biometric Verification
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !selfieImage) ||
                  (activeStep === 1 && !documentImage)
                }
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BiometricVerification;