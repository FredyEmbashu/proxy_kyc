import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff', // Set to a light color
      default: '#FFFFFF', // White background
    },
    primary: {
      main: '#00A7E1', // Cirrus sky blue
    },
    secondary: {
      main: '#F8F9FA', // Light gray
    },
    text: {
      primary: '#333333', // Dark text
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;