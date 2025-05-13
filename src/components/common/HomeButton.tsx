import React from 'react';
import { Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface HomeButtonProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const HomeButton: React.FC<HomeButtonProps> = ({ 
  position = 'top-left',
  color = 'primary'
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return { top: 16, left: 16 };
      case 'top-right':
        return { top: 16, right: 16 };
      case 'bottom-left':
        return { bottom: 16, left: 16 };
      case 'bottom-right':
        return { bottom: 16, right: 16 };
      default:
        return { top: 16, left: 16 };
    }
  };

  return (
    <Button
      component={Link}
      to="/"
      variant="contained"
      color={color}
      startIcon={<HomeIcon />}
      sx={{
        position: 'fixed',
        zIndex: 1100,
        ...getPositionStyles(),
        borderRadius: '50%',
        minWidth: '0',
        width: '56px',
        height: '56px',
        padding: 0,
        '& .MuiButton-startIcon': {
          margin: 0
        }
      }}
      aria-label="Go to home page"
    >
      <span style={{ display: 'none' }}>Home</span>
    </Button>
  );
};

export default HomeButton;