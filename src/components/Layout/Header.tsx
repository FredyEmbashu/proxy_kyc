import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { Menu as MenuIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import { authService } from '../../services/authService';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/Welcome');
  };

  const navItems = isAuthenticated ? [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Verifications', path: '/verification' },
    { label: 'Profile', path: '/profile' },
  ] : [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pricing-plans' },
    { label: 'About', path: '/about' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ my: 2 }}>
        <Logo variant="small" />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label} 
            component={Link} 
            to={item.path}
            sx={{ 
              color: 'inherit', 
              textAlign: 'center',
              ...(location.pathname === item.path && {
                color: 'primary.main',
                bgcolor: 'transparent'
              })
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {isAuthenticated ? (
          <ListItem 
            component="button" 
            onClick={handleLogout} 
            sx={{ color: 'inherit', textAlign: 'center', width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem 
            component={Link} 
            to="/login" 
            sx={{ color: 'inherit', textAlign: 'center' }}
          >
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    mx: 1, 
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'primary.main'
                    },
                    position: 'relative',
                    '&::after': location.pathname === item.path ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      bgcolor: 'primary.main'
                    } : {}
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
            
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={handleLogout}
                  sx={{ ml: 2 }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', ml: 2 }}>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="outlined" 
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                  color="primary"
                  startIcon={<PersonIcon />}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;