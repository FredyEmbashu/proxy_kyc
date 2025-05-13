import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { verificationApi } from '../../services/api';

interface VerificationDetails {
  step: number;
  status: string;
  message?: string;
}

const VerificationStatus: React.FC<{ verificationId: string }> = ({ verificationId }) => {
  const [status, setStatus] = useState({
    currentStep: 0,
    steps: ['Personal Info', 'Documents', 'Face Verification', 'Review', 'Complete'],
    details: null as VerificationDetails | null,
    loading: true,
    error: null as string | null
  });

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const response = await verificationApi.getVerificationStatus(verificationId);
        setStatus(prev => ({
          ...prev,
          currentStep: response.data.step,
          details: response.data,
          loading: false,
          error: null
        }));
        
        if (response.data.status === 'completed' || response.data.status === 'rejected') {
          clearInterval(pollInterval);
        }
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch verification status'
        }));
        clearInterval(pollInterval);
      }
    };

    checkStatus();
    pollInterval = setInterval(checkStatus, 5000);

    return () => clearInterval(pollInterval);
  }, [verificationId]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {status.loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : status.error ? (
          <Alert severity="error">{status.error}</Alert>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Verification Progress
            </Typography>
            <Stepper activeStep={status.currentStep} alternativeLabel>
              {status.steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {status.details?.message && (
              <Alert 
                severity={status.details.status === 'rejected' ? 'error' : 'info'}
                sx={{ mt: 2 }}
              >
                {status.details.message}
              </Alert>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default VerificationStatus;