import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Stack,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import PaymentIcon from '@mui/icons-material/Payment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportIcon from '@mui/icons-material/Support';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Welcome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricingpage' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Drawer content for mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Insights Namibia
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation( './components/Auth/Login')}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Header with navigation
  const header = (
    <AppBar position="fixed" sx={{ 
      background: 'rgba(255, 255, 255, 0.9)', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      backdropFilter: 'blur(10px)'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              color: theme.palette.primary.main, 
              fontWeight: 700,
              fontSize: '1.5rem'
            }}
          >
            Insights Namibia
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button 
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigation('/Login')}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                ml: 2
              }}
            >
              Login
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );

  // Hero section with gradient overlay on background image
  const heroSection = (
    <Box 
      sx={{ 
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/namibia-skyline.jpg)', // Replace with actual image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.9) 0%, rgba(123, 31, 162, 0.85) 100%)',
          zIndex: -1,
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4, mt: 8 }}>
          <Box sx={{ flex: '1 1 60%', mb: 4 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Secure Identity Verification Solutions
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 400, 
                mb: 4,
                opacity: 0.9,
                maxWidth: '700px'
              }}
            >
              Our advanced KYC solutions ensure reliable and compliant transactions for businesses and individuals across Namibia.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<PaymentIcon />}
                onClick={() => handleNavigation('/payment-plans')}
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  background: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: 'white',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }
                }}
              >
                Subscribe Now
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                startIcon={<VerifiedUserIcon />}
                onClick={() => handleNavigation('/payment-plans')}
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }
                }}
              >
                Get Verified
              </Button>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                startIcon={<PersonAddIcon />}
                onClick={() => handleNavigation('/request-verification')}
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }
                }}
              >
                Request Verification
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                onClick={() => handleNavigation('/verification-requests')}
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }
                }}
              >
                Login
              </Button>
            </Stack>
          </Box>
          <Box 
            sx={{ 
              flex: '1 1 40%', 
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center'
            }}
          >
            <Box 
              sx={{ 
                width: '80%', 
                height: '400px', 
                backgroundImage: 'url(/images/verify-illustration.png)', 
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} 
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );

  // Services section
  const servicesSection = (
    <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Comprehensive identity verification solutions for businesses and individuals in Namibia
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {[
            {
              icon: <PersonIcon fontSize="large" />,
              title: 'Individual Verification',
              description: 'Quick and secure personal identity verification for Namibian citizens and residents.',
              color: theme.palette.primary.main
            },
            {
              icon: <BusinessIcon fontSize="large" />,
              title: 'Business Verification',
              description: 'Comprehensive business verification services for legal entities operating in Namibia.',
              color: theme.palette.secondary.main
            },
            {
              icon: <SpeedIcon fontSize="large" />,
              title: 'Rapid Verification',
              description: 'Fast-track verification service for urgent identity verification needs.',
              color: '#ff9800' // orange
            }
          ].map((service, index) => (
            <Card 
              key={index} 
              sx={{ 
                borderRadius: 3,
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: service.color,
                    width: 64,
                    height: 64,
                    mb: 3,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                  }}
                >
                  {service.icon}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                  {service.description}
                </Typography>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleNavigation(`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  sx={{ 
                    color: service.color,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.03)'
                    }
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );

  // Features section
  const featuresSection = (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2
            }}
          >
            Why Choose Insights Namibia?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Our advanced identity verification solutions provide unparalleled security and reliability
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {[
            {
              icon: <SecurityIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
              title: 'Enhanced Security',
              description: 'Advanced encryption and multi-factor authentication to protect sensitive information.'
            },
            {
              icon: <CheckCircleIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
              title: 'Government Approved',
              description: 'Fully compliant with Namibian regulations and government standards.'
            },
            {
              icon: <SupportIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
              title: '24/7 Support',
              description: 'Round-the-clock customer support to assist with any verification issues.'
            }
          ].map((feature, index) => (
            <Paper 
              key={index} 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );

  // Testimonials section
  const testimonialsSection = (
    <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2
            }}
          >
            What Our Clients Say
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Trusted by businesses and individuals across Namibia
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {[
            {
              name: 'John Doe',
              position: 'CEO, Namibia Finance',
              avatar: '/images/avatar1.jpg',
              testimonial: 'Insights has transformed our customer onboarding process. The verification is quick, reliable, and fully compliant with regulations.'
            },
            {
              name: 'Sarah Johnson',
              position: 'Operations Manager, Windhoek Retail',
              avatar: '/images/avatar2.jpg',
              testimonial: 'The ease of integration and the quality of verification has significantly reduced fraud in our business. Highly recommended!'
            },
            {
              name: 'Michael Nangolo',
              position: 'Individual User',
              avatar: '/images/avatar3.jpg',
              testimonial: 'I needed my identity verified quickly for a loan application. Insights made the process seamless and I got approved within hours.'
            }
          ].map((testimonial, index) => (
            <Card 
              key={index} 
              sx={{ 
                borderRadius: 3,
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                  "{testimonial.testimonial}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {testimonial.position}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );

  // Contact section
  const contactSection = (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Get in touch with our team for any inquiries or support
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {[
            {
              icon: <LocalPhoneIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
              title: 'Phone',
              info: '+264 61 123 4567',
              action: 'Call us'
            },
            {
              icon: <EmailIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
              title: 'Email',
              info: 'info@Insights-namibia.com',
              action: 'Email us'
            },
            {
              icon: <LocationOnIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
              title: 'Office',
              info: '123 Independence Ave, Windhoek, Namibia',
              action: 'Get directions'
            }
          ].map((contact, index) => (
            <Paper 
              key={index} 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {contact.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                {contact.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {contact.info}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                {contact.action}
              </Button>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );

  // Footer section
  const footerSection = (
    <Box sx={{ py: 6, backgroundColor: '#1a237e', color: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 4,
          mb: 4
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Insights Namibia
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Providing secure identity verification solutions for Namibia since 2020.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {navItems.map((item) => (
                <Button 
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    color: 'white', 
                    opacity: 0.8,
                    justifyContent: 'flex-start',
                    p: 0,
                    '&:hover': {
                      opacity: 1,
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Services
            </Typography>
            <Stack spacing={1}>
              {['Individual Verification', 'Business Verification', 'Rapid Verification', 'Document Authentication'].map((service) => (
                <Button 
                  key={service}
                  onClick={() => handleNavigation(`/services/${service.toLowerCase().replace(/\s+/g, '-')}`)}
                  sx={{ 
                    color: 'white', 
                    opacity: 0.8,
                    justifyContent: 'flex-start',
                    p: 0,
                    '&:hover': {
                      opacity: 1,
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {service}
                </Button>
              ))}
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {['Privacy Policy', 'Terms of Service', 'Data Protection', 'Compliance'].map((item) => (
                <Button 
                  key={item}
                  onClick={() => handleNavigation(`/${item.toLowerCase().replace(/\s+/g, '-')}`)}
                  sx={{ 
                    color: 'white', 
                    opacity: 0.8,
                    justifyContent: 'flex-start',
                    p: 0,
                    '&:hover': {
                      opacity: 1,
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Insights Namibia. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Button sx={{ color: 'white', opacity: 0.8, minWidth: 'auto' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </Button>
            <Button sx={{ color: 'white', opacity: 0.8, minWidth: 'auto' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </Button>
            <Button sx={{ color: 'white', opacity: 0.8, minWidth: 'auto' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {header}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      {heroSection}
      {servicesSection}
      {featuresSection}
      {testimonialsSection}
      {contactSection}
      {footerSection}
    </Box>
  );
};

export default Welcome;