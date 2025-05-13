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
import { QrCode2 as BarcodeIcon, CheckCircle } from '@mui/icons-material';
import { biometricService } from '../../services/BiometricService';

interface BarcodeReaderProps {
  onBarcodeRead: (data: any) => void;
}

const BarcodeReader: React.FC<BarcodeReaderProps> = ({ onBarcodeRead }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [barcodeData, setBarcodeData] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Unable to access camera');
    }
  };

  const scanBarcode = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg');
        const data = await biometricService.readBarcode(imageData);
        
        setBarcodeData(data);
        onBarcodeRead(data);

        // Stop the camera after successful scan
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    } catch (err) {
      setError('Failed to read barcode');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    startScanner();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Document Barcode Scanner
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            borderRadius: 8,
            display: barcodeData ? 'none' : 'block'
          }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {!barcodeData && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '2px solid #fff',
              width: '200px',
              height: '200px',
              pointerEvents: 'none'
            }}
          />
        )}
      </Box>

      {!barcodeData && !loading && (
        <Button
          variant="contained"
          onClick={scanBarcode}
          fullWidth
          startIcon={<BarcodeIcon />}
        >
          Scan Barcode
        </Button>
      )}

      {loading && (
        <Box sx={{ textAlign: 'center', my: 3 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Reading barcode...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {barcodeData && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircle color="success" sx={{ mr: 1 }} />
            <Typography variant="h6">Barcode Data Retrieved</Typography>
          </Box>

          <List>
            <ListItem>
              <ListItemText
                primary="Document Number"
                secondary={barcodeData.documentNumber}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Full Name"
                secondary={barcodeData.name}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Date of Birth"
                secondary={barcodeData.dateOfBirth}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Nationality"
                secondary={
                  <Chip
                    label={barcodeData.nationality}
                    size="small"
                    color="primary"
                  />
                }
              />
            </ListItem>
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default BarcodeReader;