import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { Camera as CameraIcon, DocumentScanner, CheckCircle } from '@mui/icons-material';
import { documentProcessingService } from '../../services/DocumentProcessingService';
import { kycDatabaseService } from '../../services/KYCDatabaseService';

interface DocumentCaptureProps {
  onDocumentProcessed: (data: any) => void;
}

const DocumentCapture: React.FC<DocumentCaptureProps> = ({ onDocumentProcessed }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState<string>('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureDocument = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);
    setError(null);
    setProcessingStep('Capturing document...');

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.95);
        });

        const imageFile = new File([imageBlob], 'document.jpg', { type: 'image/jpeg' });

        setProcessingStep('Detecting document type...');
        const docType = await documentProcessingService.detectDocumentType(imageFile);

        setProcessingStep('Extracting information...');
        const extractedData = await documentProcessingService.extractData(imageFile, docType.type);

        setProcessingStep('Validating document...');
        const isValid = await documentProcessingService.validateDocument(extractedData);

        if (!isValid) {
          throw new Error('Document validation failed');
        }

        setProcessingStep('Checking existing records...');
        const existingProfile = await kycDatabaseService.findProfile(extractedData.documentNumber);

        if (existingProfile) {
          setDocumentData({ ...existingProfile, isExisting: true });
        } else {
          const newProfile = await kycDatabaseService.createProfile({
            type: 'individual',
            documentData: extractedData,
            verificationStatus: 'pending'
          });
          setDocumentData({ ...newProfile, isExisting: false });
        }

        onDocumentProcessed(documentData);
        stopCamera();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process document');
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Document Capture
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            borderRadius: 8,
            display: documentData ? 'none' : 'block'
          }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {!documentData && !loading && (
          <Button
            variant="contained"
            startIcon={<CameraIcon />}
            onClick={captureDocument}
            fullWidth
            sx={{ mt: 2 }}
          >
            Capture Document
          </Button>
        )}
      </Box>

      {loading && (
        <Box sx={{ textAlign: 'center', my: 3 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>{processingStep}</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {documentData && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DocumentScanner color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Document Information
            </Typography>
            {documentData.isExisting && (
              <Chip
                icon={<CheckCircle />}
                label="Existing Record Found"
                color="success"
                sx={{ ml: 2 }}
              />
            )}
          </Box>

          <List>
            <ListItem>
              <ListItemText
                primary="Full Name"
                secondary={documentData.documentData.fullName}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Document Number"
                secondary={documentData.documentData.documentNumber}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Date of Birth"
                secondary={documentData.documentData.dateOfBirth}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Nationality"
                secondary={documentData.documentData.nationality}
              />
            </ListItem>
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default DocumentCapture;