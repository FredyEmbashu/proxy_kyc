import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientVerification: React.FC = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState('');

  const handleVerification = () => {
    // Add verification logic here
    console.log('Verifying client:', clientId);
    navigate('/verification-report');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Verify Client
        </Typography>
        <TextField
          fullWidth
          label="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerification}
          sx={{ mt: 2 }}
        >
          Verify Client
        </Button>
      </Paper>
    </Box>
  );
};

export default ClientVerification;