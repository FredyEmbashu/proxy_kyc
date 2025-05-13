import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
  color?: 'primary' | 'white';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', color = 'primary' }) => {
  const getSize = () => {
    switch (variant) {
      case 'small':
        return { logoSize: '1.8rem', subSize: '0.7rem' };
      case 'large':
        return { logoSize: '3rem', subSize: '1.1rem' };
      default:
        return { logoSize: '2.5rem', subSize: '0.9rem' };
    }
  };

  const { logoSize, subSize } = getSize();
  const textColor = color === 'primary' ? '#B22A6F' : 'white';
  const subTextColor = color === 'primary' ? '#333' : 'rgba(255, 255, 255, 0.8)';

  return (
    <Box className="text-logo">
      <Typography 
        className="logo-text" 
        sx={{ 
          fontSize: logoSize, 
          fontWeight: 700, 
          color: textColor, 
          letterSpacing: '2px',
          lineHeight: 1
        }}
      >
        PROXY
      </Typography>
      <Typography 
        className="logo-subtext" 
        sx={{ 
          fontSize: subSize, 
          color: subTextColor, 
          letterSpacing: '1px'
        }}
      >
        KYC
      </Typography>
    </Box>
  );
};

export default Logo;