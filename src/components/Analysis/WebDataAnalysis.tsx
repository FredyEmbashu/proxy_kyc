import React from 'react';
import { Box, Typography } from '@mui/material';

const WebDataAnalysis: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Web Data Analysis
      </Typography>
      <Typography variant="body1">
        Analyze web data for insights.
      </Typography>
    </Box>
  );
};

export default WebDataAnalysis;