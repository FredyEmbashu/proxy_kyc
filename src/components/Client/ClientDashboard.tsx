import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from '@mui/material';
import { VerifiedUser, Download } from '@mui/icons-material';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('pending');

  const handleStartVerification = () => {
    navigate('/verify/personal');
  };

  const handleDownloadCertificate = () => {
    // Certificate download logic
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to KYC Verification
        </Typography>

        {verificationStatus === 'pending' ? (
          <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
            <VerifiedUser sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Start Your Verification
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              Complete your KYC verification in just a few steps
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartVerification}
            >
              Begin Verification
            </Button>
          </Paper>
        ) : (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Verification Complete
              </Typography>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleDownloadCertificate}
              >
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ClientDashboard;