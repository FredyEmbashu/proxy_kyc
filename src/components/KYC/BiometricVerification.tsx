import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Face as FaceIcon,
  Visibility as IrisIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { biometricService } from '../../services/BiometricService';

interface BiometricVerificationProps {
  documentImage?: string;
  onVerificationComplete: (result: any) => void;
}

const BiometricVerification: React.FC<BiometricVerificationProps> = ({
  documentImage,
  onVerificationComplete
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: activeTab === 0 ? 'user' : 'environment',
          width: 1280,
          height: 720
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Unable to access camera');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      return canvas.toDataURL('image/jpeg', 0.95);
    }
    return null;
  };

  const handleVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      const capturedImage = await captureImage();
      if (!capturedImage || !documentImage) {
        throw new Error('Failed to capture image');
      }

      const result = activeTab === 0
        ? await biometricService.matchFace(capturedImage, documentImage)
        : await biometricService.matchIris(capturedImage, documentImage);

      setMatchResult(result);
      onVerificationComplete(result);
      stopCamera();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [activeTab]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Biometric Verification
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        centered
        sx={{ mb: 3 }}
      >
        <Tab icon={<FaceIcon />} label="Face" />
        <Tab icon={<IrisIcon />} label="Iris" />
      </Tabs>

      <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            borderRadius: 8,
            display: matchResult ? 'none' : 'block'
          }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </Box>

      {!matchResult && !loading && (
        <Button
          variant="contained"
          onClick={handleVerification}
          fullWidth
          startIcon={activeTab === 0 ? <FaceIcon /> : <IrisIcon />}
        >
          Capture {activeTab === 0 ? 'Face' : 'Iris'}
        </Button>
      )}

      {loading && (
        <Box sx={{ textAlign: 'center', my: 3 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Processing...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {matchResult && (
        <Box sx={{ mt: 3 }}>
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
            Confidence: {matchResult.confidence.toUpperCase()}
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

          {matchResult.details.warnings?.length > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {matchResult.details.warnings.join(', ')}
            </Alert>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default BiometricVerification;