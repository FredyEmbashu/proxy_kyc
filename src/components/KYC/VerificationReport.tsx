import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Divider,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import {
  VerifiedUser,
  Security,
  Description,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { pdfReportService } from '../../services/PDFReportService';
import {
  DocumentData,
  BiometricData,
  FingerprintData,
  BusinessData,
} from '../../types/verification';

interface VerificationReportProps {
  documentData?: DocumentData;
  biometricData?: BiometricData;
  fingerprintData?: FingerprintData;
  businessData?: BusinessData;
}

const VerificationReport: React.FC<VerificationReportProps> = ({
  documentData,
  biometricData,
  fingerprintData,
  businessData
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const verificationSteps = [
    { label: 'Document Verification', completed: !!documentData },
    { label: 'Biometric Verification', completed: !!biometricData },
    { label: 'Fingerprint Verification', completed: !!fingerprintData },
    { label: 'Business Verification', completed: !!businessData }
  ];

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const pdfData = await pdfReportService.generateReport({
        documentData,
        biometricData,
        fingerprintData,
        businessData
      });

      const link = document.createElement('a');
      link.href = pdfData;
      link.download = `KYC_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">
          KYC Verification Report
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Download Report'}
        </Button>
      </Stack>

      <Stepper sx={{ mb: 4 }}>
        {verificationSteps.map((step, index) => (
          <Step key={index} completed={step.completed}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack spacing={4}>
        {documentData && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Description sx={{ mr: 1 }} /> Document Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2">Name</Typography>
                <Typography>{documentData.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Document Number</Typography>
                <Typography>{documentData.documentNumber}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Nationality</Typography>
                <Typography>{documentData.nationality}</Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {biometricData && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <VerifiedUser sx={{ mr: 1 }} /> Biometric Verification
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2">Face Match</Typography>
                <Chip
                  label={biometricData.faceMatch ? 'Verified' : 'Not Verified'}
                  color={biometricData.faceMatch ? 'success' : 'error'}
                />
                <Typography variant="body2">
                  Match Score: {(biometricData.matchScore * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {fingerprintData && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Security sx={{ mr: 1 }} /> Fingerprint Verification
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2">Match Status</Typography>
                <Chip
                  label={fingerprintData.isMatch ? 'Verified' : 'Not Verified'}
                  color={fingerprintData.isMatch ? 'success' : 'error'}
                />
                <Typography variant="body2">
                  Confidence: {(fingerprintData.confidence * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {businessData && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Description sx={{ mr: 1 }} /> Business Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2">Business Name</Typography>
                <Typography>{businessData.businessName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Registration Number</Typography>
                <Typography>{businessData.registrationNumber}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Verification Status</Typography>
                <Chip
                  label={businessData.verificationStatus}
                  color={businessData.verificationStatus === 'Verified' ? 'success' : 'warning'}
                />
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default VerificationReport;