import React from 'react';
import { Box, Typography } from '@mui/material';

const IrisScanning: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Iris Scanning
      </Typography>
      <Typography variant="body1">
        Scan and verify iris data.
      </Typography>
    </Box>
  );
};

export default IrisScanning;