import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Rating,
} from '@mui/material';
import riskScoringService from '../../services/RiskScoringService';
import businessVerificationService from '../../services/BusinessVerificationService';

interface BusinessVerificationProps {
  onVerificationComplete?: (result: any) => void;
  socialMediaData?: any[];
  webPresenceData?: any[];
  personalInfo?: any;
}

const BusinessVerification: React.FC<BusinessVerificationProps> = ({
  onVerificationComplete,
  socialMediaData = [],
  webPresenceData = [],
  personalInfo = {},
}) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState<any>(null);
  const [riskAssessment, setRiskAssessment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    if (!registrationNumber) return;

    setLoading(true);
    setError(null);

    try {
      const businessResult = await businessVerificationService.verifyBusiness(registrationNumber);
      setBusinessData(businessResult);

      // Fix: Use calculateRiskScore instead of calculateRiskAssessment
      const riskResult = await riskScoringService.calculateRiskScore({
        personalInfo: {
          fullName: personalInfo.fullName || 'Unknown',
          dateOfBirth: personalInfo.dateOfBirth || '1990-01-01',
          address: personalInfo.address || 'Unknown',
          nationality: personalInfo.nationality || 'Namibian',
          gender: personalInfo.gender || 'Unknown'
        },
        documentInfo: {
          documentType: 'id_card',
          documentNumber: businessResult.profile.registrationNumber || '',
          issueDate: businessResult.profile.registrationDate || '2020-01-01',
          expiryDate: '2030-01-01',
          issuingAuthority: 'Namibia Business Registry'
        },
        biometricData: {},
        behavioralData: {
          completionTimeSeconds: 120,
          numberOfAttempts: 1,
          deviceInfo: navigator.userAgent,
          ipAddress: '127.0.0.1'
        },
        externalVerification: {
          socialMediaVerified: socialMediaData.length > 0,
          bankAccountVerified: businessResult.profile.status === 'active',
          phoneNumberVerified: true,
          emailVerified: true
        }
      });
      setRiskAssessment(riskResult);

      onVerificationComplete?.({ business: businessResult, risk: riskResult });
    } catch (err) {
      setError('Failed to verify business information');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Business Verification
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Business Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleVerification}
          disabled={!registrationNumber || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Verify Business'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {businessData && (
        <>
          <Typography variant="h6" gutterBottom>
            Business Profile
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Company Name"
                secondary={businessData.profile.companyName}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Status"
                secondary={
                  <Chip
                    label={businessData.profile.status}
                    color={businessData.profile.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Directors"
                secondary={businessData.profile.directors.join(', ')}
              />
            </ListItem>
          </List>
        </>
      )}

      {riskAssessment && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Risk Assessment
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Risk Level:
            </Typography>
            <Chip
              label={riskAssessment.riskLevel.toUpperCase()}
              color={getRiskColor(riskAssessment.riskLevel)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Risk Score</Typography>
            <Rating
              value={riskAssessment.overallScore / 20}
              readOnly
              precision={0.5}
            />
          </Box>
          <List>
            {riskAssessment.factors.map((factor: any, index: number) => (
              <ListItem key={index}>
                <ListItemText
                  primary={factor.category}
                  secondary={factor.description}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Recommendations
          </Typography>
          <List>
            {riskAssessment.recommendations.map((rec: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={rec} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default BusinessVerification;