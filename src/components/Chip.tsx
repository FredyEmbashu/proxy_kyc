import React from 'react';
import { Box, Typography } from '@mui/material';

interface ChipProps {
  label: string;
  sx?: any;
}

const Chip: React.FC<ChipProps> = ({ label, sx = {} }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 32,
        px: 2,
        py: 0.5,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        ...sx
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default Chip;