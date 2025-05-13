import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import HomeButton from '../common/HomeButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <HomeButton position="bottom-right" />
    </Box>
  );
};

export default Layout;