import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Alert, Stack, Divider } from '@mui/material';
import riskScoringService, { VerificationData, RiskScore } from '../../services/RiskScoringService';
import RiskScoreDisplay from './RiskScoreDisplay';

const RiskScoring: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This would normally come from your application state or API
  const generateMockVerificationData = (): VerificationData => {
    return {
      personalInfo: {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        address: '123 Main St, Windhoek, Namibia',
        nationality: 'Namibian',
        gender: 'Male'
      },
      documentInfo: {
        documentType: 'id_card',
        documentNumber: 'NAM123456789',
        issueDate: '2018-01-01',
        expiryDate: '2028-01-01',
        issuingAuthority: 'Namibia Ministry of Home Affairs'
      },
      biometricData: {
        faceMatchScore: 85,
        fingerprintMatchScore: 90,
        irisMatchScore: 88
      },
      behavioralData: {
        completionTimeSeconds: 120,
        numberOfAttempts: 1,
        deviceInfo: 'Chrome 90.0.4430.212 on Windows 10',
        ipAddress: '41.182.125.10'
      },
      externalVerification: {
        socialMediaVerified: true,
        bankAccountVerified: true,
        phoneNumberVerified: true,
        emailVerified: true
      }
    };
  };

  const calculateRiskScore = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const verificationData = generateMockVerificationData();
      const score = await riskScoringService.calculateRiskScore(verificationData);
      setRiskScore(score);
      
      // Store risk score in localStorage so it can be accessed by dashboards
      localStorage.setItem('riskScoreData', JSON.stringify(score));
    } catch (err) {
      console.error('Error calculating risk score:', err);
      setError('Failed to calculate risk score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get existing risk score from localStorage
    const storedScore = localStorage.getItem('riskScoreData');
    if (storedScore) {
      try {
        setRiskScore(JSON.parse(storedScore));
      } catch (err) {
        console.error('Error parsing stored risk score:', err);
        calculateRiskScore();
      }
    } else {
      // Calculate risk score when component mounts if not in localStorage
      calculateRiskScore();
    }
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Risk Assessment
      </Typography>
      
      <Typography variant="body1" paragraph>
        Our advanced risk scoring algorithm analyzes multiple factors to determine the risk level
        associated with this verification. The score is based on document authenticity, biometric
        matching, behavioral patterns, and external verification sources.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {riskScore ? (
        <RiskScoreDisplay score={riskScore} loading={loading} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Button 
            variant="contained" 
            onClick={calculateRiskScore}
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate Risk Score'}
          </Button>
        </Box>
      )}
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          About Our Risk Scoring Model
        </Typography>
        <Typography variant="body1" paragraph>
          Our risk scoring model uses machine learning algorithms trained on thousands of verification
          cases to identify patterns associated with fraudulent activities. The model considers:
        </Typography>
        
        <Stack direction="column" spacing={3}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Document Factors:
            </Typography>
            <ul>
              <li>Document expiration status</li>
              <li>Security feature detection</li>
              <li>Document type and issuing authority</li>
              <li>Document tampering detection</li>
            </ul>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Biometric Factors:
            </Typography>
            <ul>
              <li>Face matching confidence</li>
              <li>Liveness detection results</li>
              <li>Fingerprint and iris matching (when available)</li>
              <li>Age and gender consistency</li>
            </ul>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Behavioral Factors:
            </Typography>
            <ul>
              <li>Verification completion time</li>
              <li>Number of verification attempts</li>
              <li>Device and browser information</li>
              <li>IP address and geolocation</li>
            </ul>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              External Verification:
            </Typography>
            <ul>
              <li>Social media presence</li>
              <li>Bank account verification</li>
              <li>Phone number verification</li>
              <li>Email verification</li>
            </ul>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RiskScoring;