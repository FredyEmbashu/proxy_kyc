import React from 'react';
import { Box, Typography } from '@mui/material';

const BiometricMatching: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Biometric Matching
      </Typography>
      <Typography variant="body1">
        Match biometric data for verification.
      </Typography>
    </Box>
  );
};

export default BiometricMatching;