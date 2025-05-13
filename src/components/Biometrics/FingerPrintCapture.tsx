import React from 'react';
import { Box, Typography } from '@mui/material';

const FingerPrintCapture: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Fingerprint Capture
      </Typography>
      <Typography variant="body1">
        Capture and verify fingerprint data.
      </Typography>
    </Box>
  );
};

export default FingerPrintCapture;