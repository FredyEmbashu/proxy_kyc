import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const PersonalInfo: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Please review and update your personal information.
      </Typography>
      <TextField label="Full Name" fullWidth sx={{ mb: 2 }} defaultValue="John Doe" />
      <TextField label="Date of Birth" fullWidth sx={{ mb: 2 }} defaultValue="1990-01-01" />
      <TextField label="Address" fullWidth sx={{ mb: 2 }} defaultValue="123 Main St, Windhoek" />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default PersonalInfo;