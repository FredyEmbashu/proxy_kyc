import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Divider,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Services = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const serviceCards = [
    {
      title: 'Individual Verification',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      description: 'Comprehensive identity verification for individuals, ensuring compliance with KYC regulations.',
      features: [
        'ID document verification',
        'Biometric face matching',
        'Address verification',
        'PEP and sanctions screening'
      ],
      path: '/services/individual-verification',
      color: theme.palette.primary.main
    },
    {
      title: 'Business Verification',
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      description: 'Verify business entities and their representatives with our comprehensive KYB solutions.',
      features: [
        'Company registration verification',
        'Director and UBO verification',
        'Business address verification',
        'Risk assessment'
      ],
      path: '/services/business-verification',
      color: theme.palette.secondary.main
    },
    {
      title: 'Rapid Verification',
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      description: 'Fast-track verification for urgent needs without compromising on security or compliance.',
      features: [
        'Expedited processing',
        'Priority verification',
        'Real-time results',
        '24/7 support'
      ],
      path: '/services/rapid-verification',
      color: '#ff9800' // orange
    },
    {
      title: 'Document Authentication',
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      description: 'Advanced document verification to detect forgeries and ensure authenticity.',
      features: [
        'Hologram detection',
        'Microprint verification',
        'UV feature detection',
        'Document tampering checks'
      ],
      path: '/services/document-authentication',
      color: '#4caf50' // green
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Our Services
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Comprehensive identity verification solutions tailored for Namibian businesses and individuals
          </Typography>
          <Divider sx={{ mb: 6 }} />
        </Box>

        {/* Service Cards */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4, 
            mb: 8 
          }}
        >
          {serviceCards.map((service, index) => (
            <Box 
              key={index} 
              sx={{ 
                width: { xs: '100%', md: 'calc(50% - 16px)' }
              }}
            >
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      bgcolor: service.color,
                      color: 'white',
                      borderRadius: '50%',
                      p: 1.5,
                      mr: 2,
                      display: 'flex'
                    }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  
                  <List>
                    {service.features.map((feature, idx) => (
                      <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon sx={{ color: service.color, fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    variant="outlined" 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(service.path)}
                    sx={{ 
                      borderColor: service.color,
                      color: service.color,
                      '&:hover': {
                        borderColor: service.color,
                        backgroundColor: `${service.color}10`
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
            Why Choose Our Verification Services
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3 
          }}>
            {[
              {
                icon: <SecurityIcon sx={{ fontSize: 40 }} />,
                title: 'Advanced Security',
                description: 'State-of-the-art encryption and security protocols to protect sensitive data.'
              },
              {
                icon: <SpeedIcon sx={{ fontSize: 40 }} />,
                title: 'Fast Processing',
                description: 'Quick verification turnaround times without compromising on thoroughness.'
              },
              {
                icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
                title: 'Regulatory Compliance',
                description: 'Full compliance with Namibian KYC/AML regulations and international standards.'
              }
            ].map((feature, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flex: { xs: '100%', md: 'calc(33.333% - 16px)' }
                }}
              >
                <Paper elevation={0} sx={{ 
                  p: 4, 
                  borderRadius: 3, 
                  height: '100%',
                  border: '1px solid rgba(0,0,0,0.08)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Box sx={{ 
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      borderRadius: '50%',
                      p: 1.5,
                      mb: 2,
                      display: 'flex'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Paper sx={{ 
          p: 6, 
          borderRadius: 3,
          bgcolor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Join hundreds of businesses and individuals who trust our verification solutions for secure and compliant operations.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/payment-plans')}
              sx={{ 
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'white',
                },
                py: 1.5,
                px: 4,
                borderRadius: 2
              }}
            >
              View Pricing Plans
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/contact')}
              sx={{ 
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                },
                py: 1.5,
                px: 4,
                borderRadius: 2
              }}
            >
              Contact Sales
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Services;