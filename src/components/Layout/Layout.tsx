import React, { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <Navbar />
      <Sidebar /> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;