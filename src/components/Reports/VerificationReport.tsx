import React, { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Container, Button, Paper, Stepper, Step, StepLabel,
  TextField, FormControl, Select, MenuItem, Card, CardContent, 
  Stack, useTheme
} from '@mui/material';
import { 
  CameraAlt, ArrowForward, CreditCard 
} from '@mui/icons-material';
import Webcam from 'react-webcam';

interface FormData {
  documentType: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const VerificationProcess: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    documentType: 'id',
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  
  const cameraRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const steps = [
    'Document Selection', 
    'Document Capture', 
    'Personal Information', 
    'Selfie Capture', 
    'Verification Complete'
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCapture = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      handleNext();
    }
  };

  const renderStep = () => {
    switch(activeStep) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Select Document Type
            </Typography>
            <Stack spacing={2} sx={{ maxWidth: 500, margin: 'auto' }}>
              {['id', 'passport', 'driver'].map(type => (
                <Card 
                  key={type}
                  sx={{ 
                    cursor: 'pointer', 
                    border: formData.documentType === type 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : '1px solid rgba(0,0,0,0.12)'
                  }}
                  onClick={() => setFormData(prev => ({ ...prev, documentType: type }))}
                >
                  <CardContent>
                    <CreditCard sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6">
                      {type === 'id' ? 'Namibian ID' : 
                       type === 'passport' ? 'Passport' : 
                       "Driver's License"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
            <Button 
              variant="contained" 
              onClick={handleNext} 
              sx={{ mt: 3 }}
              endIcon={<ArrowForward />}
            >
              Next
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Capture Document
            </Typography>
            <Webcam 
              ref={cameraRef}
              screenshotFormat="image/jpeg"
              style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
            />
            <Button 
              variant="contained"
              onClick={handleCapture}
              sx={{ mt: 2 }}
              startIcon={<CameraAlt />}
            >
              Capture Document
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ py: 4, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Personal Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <Button 
                variant="contained" 
                onClick={handleNext}
                endIcon={<ArrowForward />}
              >
                Next
              </Button>
            </Stack>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Take Selfie
            </Typography>
            <Webcam 
              ref={cameraRef}
              screenshotFormat="image/jpeg"
              style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
            />
            <Button 
              variant="contained"
              onClick={handleCapture}
              sx={{ mt: 2 }}
              startIcon={<CameraAlt />}
            >
              Capture Selfie
            </Button>
          </Box>
        );
      case 4:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" gutterBottom>
              Verification Complete
            </Typography>
            <Button 
              variant="contained"
              onClick={() => navigate('/welcome')}
            >
              Home
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}
      </Paper>
    </Container>
  );
};

export default VerificationProcess;