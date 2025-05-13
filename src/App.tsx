import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes';
import customTheme from './theme/customTheme';
import './App.css';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Proxy KYC - Secure Identity Verification';
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;