import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Button, Alert, LinearProgress } from '@mui/material';
import BiometricService from '../../services/BiometricService';

interface VerificationProps {
  selfieImage: string;
  documentImage: string;
  documentType: 'passport' | 'id_card' | 'drivers_license';
  onVerificationComplete: (result: {
    faceMatch: { isMatch: boolean; confidence: number };
    documentAuthenticity: { isAuthentic: boolean; confidence: number; issues: string[] };
  }) => void;
}

const FaceDocumentVerification: React.FC<VerificationProps> = ({
  selfieImage,
  documentImage,
  documentType,
  onVerificationComplete
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faceMatchResult, setFaceMatchResult] = useState<{ isMatch: boolean; confidence: number } | null>(null);
  const [documentResult, setDocumentResult] = useState<{ 
    isAuthentic: boolean; 
    confidence: number; 
    issues: string[] 
  } | null>(null);
  const [verificationStep, setVerificationStep] = useState(1);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const performVerification = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Step 1: Document authenticity verification
        setVerificationStep(1);
        setOverallProgress(25);
        const docResult = await BiometricService.verifyDocumentAuthenticity(
          documentImage,
          documentType
        );
        
        setDocumentResult({
          isAuthentic: docResult.isAuthentic,
          confidence: docResult.confidence,
          issues: docResult.detectedIssues
        });
        
        // Step 2: Face matching
        setVerificationStep(2);
        setOverallProgress(75);
        const faceResult = await BiometricService.compareFaces(selfieImage, documentImage);
        
        setFaceMatchResult({
          isMatch: faceResult.isMatch,
          confidence: faceResult.confidence
        });
        
        // Complete verification
        setOverallProgress(100);
        
        // Notify parent component of results
        onVerificationComplete({
          faceMatch: {
            isMatch: faceResult.isMatch,
            confidence: faceResult.confidence
          },
          documentAuthenticity: {
            isAuthentic: docResult.isAuthentic,
            confidence: docResult.confidence,
            issues: docResult.detectedIssues
          }
        });
        
      } catch (err) {
        console.error('Verification error:', err);
        setError('An error occurred during verification. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performVerification();
  }, [selfieImage, documentImage, documentType, onVerificationComplete]);

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'success.main';
    if (value >= 60) return 'warning.main';
    return 'error.main';
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom align="center">
        Biometric Verification
      </Typography>
      
      <LinearProgress 
        variant="determinate" 
        value={overallProgress} 
        sx={{ mb: 4, height: 8, borderRadius: 4 }} 
      />
      
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {verificationStep === 1 ? 'Verifying document authenticity...' : 'Comparing facial features...'}
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : (
        <Box>
          {/* Document Verification Results */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Document Verification
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Authenticity:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: documentResult?.isAuthentic ? 'success.main' : 'error.main'
                }}
              >
                {documentResult?.isAuthentic ? 'Authentic' : 'Potentially Fraudulent'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Confidence:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: getStatusColor(documentResult?.confidence || 0)
                }}
              >
                {documentResult?.confidence.toFixed(1)}%
              </Typography>
            </Box>
            
            {documentResult?.issues && documentResult.issues.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Detected Issues:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {documentResult.issues.map((issue, index) => (
                    <li key={index}>
                      <Typography variant="body2">{issue}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Paper>
          
          {/* Face Matching Results */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Face Matching
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Match Result:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: faceMatchResult?.isMatch ? 'success.main' : 'error.main'
                }}
              >
                {faceMatchResult?.isMatch ? 'Match' : 'No Match'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Confidence:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: getStatusColor(faceMatchResult?.confidence || 0)
                }}
              >
                {faceMatchResult?.confidence.toFixed(1)}%
              </Typography>
            </Box>
          </Paper>
          
          {/* Overall Result */}
          <Alert 
            severity={
              (faceMatchResult?.isMatch && documentResult?.isAuthentic) ? 'success' : 'error'
            }
            sx={{ mb: 3 }}
          >
            {(faceMatchResult?.isMatch && documentResult?.isAuthentic) 
              ? 'Verification successful! The face matches the document and the document appears authentic.'
              : 'Verification failed. Please check the details above for more information.'
            }
          </Alert>
          
          <Button 
            variant="contained" 
            fullWidth
            onClick={() => window.location.reload()}
          >
            Retry Verification
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default FaceDocumentVerification;