import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const VerificationRequests: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Request Verification
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Enter the client's email, ID, or WhatsApp number to send a verification request.
      </Typography>
      <TextField label="Email" fullWidth sx={{ mb: 2 }} />
      <TextField label="ID Number" fullWidth sx={{ mb: 2 }} />
      <TextField label="WhatsApp Number" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" color="primary">
        Send Verification Request
      </Button>
    </Box>
  );
};

export default VerificationRequests;