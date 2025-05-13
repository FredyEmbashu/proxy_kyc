import React from 'react';
import { Box, Typography } from '@mui/material';

const DigitalSignature: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Digital Signature
      </Typography>
      <Typography variant="body1">
        Sign documents digitally.
      </Typography>
    </Box>
  );
};

export default DigitalSignature;