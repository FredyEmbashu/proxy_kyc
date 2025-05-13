import React from 'react';
import { Box, Typography } from '@mui/material';

const AnalyticsDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Typography variant="body1">
        View analytics and insights.
      </Typography>
    </Box>
  );
};

export default AnalyticsDashboard;