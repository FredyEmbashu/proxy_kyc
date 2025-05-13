import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#B22A6F',
      light: '#d45a96',
      dark: '#8e2259',
      contrastText: '#fff',
    },
    secondary: {
      main: '#333333',
      light: '#666666',
      dark: '#000000',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#f9f9f9',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '20px',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '15px',
      position: 'relative',
    },
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '12px 25px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 5px 15px rgba(178, 42, 111, 0.3)',
          },
        },
        contained: {
          backgroundColor: '#B22A6F',
          color: 'white',
          '&:hover': {
            backgroundColor: '#8e2259',
          },
        },
        outlined: {
          borderColor: '#B22A6F',
          color: '#B22A6F',
          borderWidth: '2px',
          '&:hover': {
            backgroundColor: '#B22A6F',
            color: 'white',
            borderColor: '#B22A6F',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#B22A6F',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#B22A6F',
          height: '3px',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: '#B22A6F',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#f8f4f6',
        },
        barColorPrimary: {
          backgroundColor: '#B22A6F',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: '#f8f4f6',
          color: '#B22A6F',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default customTheme;