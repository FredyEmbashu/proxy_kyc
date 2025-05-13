import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import GroupsIcon from '@mui/icons-material/Groups';

const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            About Insights Namibia
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Leading the way in secure identity verification solutions for Namibia's digital future
          </Typography>
          <Divider sx={{ mb: 6 }} />
        </Box>

        {/* Our Mission */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4, 
          mb: 8 
        }}>
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Insights Namibia, our mission is to provide secure, reliable, and accessible identity verification 
              solutions that empower businesses and individuals across Namibia. We are committed to combating 
              fraud while ensuring seamless user experiences.
            </Typography>
            <Typography variant="body1">
              We believe that trust is the foundation of every digital interaction, and our advanced KYC 
              solutions are designed to build and maintain that trust in an increasingly digital world.
            </Typography>
          </Box>
          <Paper elevation={0} sx={{ 
            flex: 1, 
            p: 4, 
            borderRadius: 3, 
            bgcolor: theme.palette.primary.main,
            color: 'white',
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a Namibia where digital identity verification is seamless, secure, and accessible to all. 
                Our goal is to be the leading provider of KYC solutions that enable businesses to comply with 
                regulations while providing exceptional user experiences.
              </Typography>
              <Typography variant="body1">
                By leveraging cutting-edge technology and deep local expertise, we aim to set new standards for 
                identity verification in Namibia and beyond.
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Core Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
            Our Core Values
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 3 
          }}>
            {[
              {
                icon: <SecurityIcon sx={{ fontSize: 40 }} />,
                title: 'Security',
                description: 'We prioritize the security and privacy of personal data above all else, implementing the highest standards of data protection.'
              },
              {
                icon: <BusinessIcon sx={{ fontSize: 40 }} />,
                title: 'Integrity',
                description: 'We operate with unwavering integrity, ensuring transparent and ethical practices in all our business operations.'
              },
              {
                icon: <GroupsIcon sx={{ fontSize: 40 }} />,
                title: 'Innovation',
                description: 'We continuously innovate to stay ahead of emerging threats and provide cutting-edge verification solutions.'
              }
            ].map((value, index) => (
              <Paper key={index} elevation={0} sx={{ 
                flex: 1,
                p: 4, 
                borderRadius: 3, 
                border: '1px solid rgba(0,0,0,0.08)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    width: 80, 
                    height: 80,
                    mb: 2
                  }}>
                    {value.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1">
                    {value.description}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Our Story */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Our Story
          </Typography>
          
          <Paper elevation={0} sx={{ 
            p: 4, 
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.08)'
          }}>
            <Typography variant="body1" paragraph>
              Founded in 2020, Insights Namibia emerged from a recognition of the growing need for robust identity 
              verification solutions in Namibia's rapidly digitalizing economy. Our founders, with backgrounds in 
              cybersecurity and financial technology, saw an opportunity to address the challenges faced by businesses 
              in complying with KYC regulations while providing seamless user experiences.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Starting with a small team of dedicated professionals, we developed our first verification solution 
              tailored specifically for Namibian financial institutions. The success of this initial offering led to 
              rapid growth and expansion into other sectors, including telecommunications, healthcare, and government services.
            </Typography>
            
            <Typography variant="body1">
              Today, Insights Namibia stands as a trusted partner for businesses across the country, helping them 
              navigate the complex landscape of identity verification with innovative, secure, and user-friendly solutions. 
              Our journey continues as we expand our offerings and explore new technologies to better serve our clients 
              and contribute to Namibia's digital transformation.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About;