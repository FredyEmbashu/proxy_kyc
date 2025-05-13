import React, { useState } from 'react';
import { Box, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import DocumentUpload from '../components/KYC/DocumentUpload'; // Fixed capitalization
import biometricService from '../services/BiometricService';

const DocumentVerificationTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDocumentUpload = async (imageData: string, documentType: 'passport' | 'id_card' | 'drivers_license') => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Document uploaded: ${documentType}`);
      
      // Call the document verification service
      const verificationResult = await biometricService.verifyDocumentAuthenticity(
        imageData,
        documentType
      );
      
      setResult(verificationResult);
    } catch (err) {
      console.error('Error during verification:', err);
      setError('An error occurred during document verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Document Verification Test
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <DocumentUpload onUpload={handleDocumentUpload} />
      </Paper>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {result && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Verification Results
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Document Authentic:</strong> {result.isAuthentic ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body1">
              <strong>Confidence:</strong> {result.confidence.toFixed(1)}%
            </Typography>
          </Box>
          
          {result.detectedIssues && result.detectedIssues.length > 0 && (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Detected Issues:
              </Typography>
              <ul>
                {result.detectedIssues.map((issue: string, index: number) => (
                  <li key={index}>
                    <Typography variant="body2">{issue}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default DocumentVerificationTest;