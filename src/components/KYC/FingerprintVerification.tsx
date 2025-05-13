import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  Fingerprint as FingerprintIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { biometricService } from '../../services/BiometricService';

interface FingerprintVerificationProps {
  documentPrint?: string;
  onVerificationComplete: (result: any) => void;
}

const FingerprintVerification: React.FC<FingerprintVerificationProps> = ({
  documentPrint,
  onVerificationComplete
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const captureFingerprint = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement actual fingerprint scanner integration
      const mockCapturedPrint = 'mock_fingerprint_data';
      
      if (!documentPrint) {
        throw new Error('Document fingerprint not available');
      }

      const result = await biometricService.matchFingerprint(mockCapturedPrint, documentPrint);
      setMatchResult(result);
      onVerificationComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fingerprint verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Fingerprint Verification
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box flex={1}>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              mb: 2
            }}
          >
            <FingerprintIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography>Place your finger on the scanner</Typography>
          </Box>
          
          <Button
            variant="contained"
            onClick={captureFingerprint}
            fullWidth
            disabled={loading}
            startIcon={<FingerprintIcon />}
          >
            {loading ? <CircularProgress size={24} /> : 'Scan Fingerprint'}
          </Button>
        </Box>

        <Box flex={1}>
          {matchResult && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Match Result:
                </Typography>
                <Chip
                  icon={matchResult.isMatch ? <SuccessIcon /> : <ErrorIcon />}
                  label={matchResult.isMatch ? 'Match' : 'No Match'}
                  color={matchResult.isMatch ? 'success' : 'error'}
                />
              </Box>

              <Typography variant="body2" gutterBottom>
                Finger: {matchResult.fingerPosition}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Match Score: {(matchResult.matchScore * 100).toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={matchResult.matchScore * 100}
                  color={matchResult.isMatch ? 'success' : 'error'}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Quality Score: {(matchResult.quality * 100).toFixed(1)}%
                </Typography>
                <Typography variant="body2">
                  Minutiae Points: {matchResult.minutiaeCount}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default FingerprintVerification;