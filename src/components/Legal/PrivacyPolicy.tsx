import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Last Updated: June 1, 2023
          </Typography>
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body1" paragraph>
            At Insights Namibia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our identity verification services.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect personal information that you voluntarily provide to us when you use our services, including but not limited to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" paragraph>
                Personal identification information (Name, email address, phone number, etc.)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Government-issued identification documents
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Biometric data (facial images, fingerprints when applicable)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Address and contact information
              </Typography>
            </li>
          </ul>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect for various purposes, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" paragraph>
                Providing and maintaining our verification services
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Verifying your identity and preventing fraud
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Complying with legal and regulatory requirements
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Improving our services and user experience
              </Typography>
            </li>
          </ul>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            3. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, 
            and regular security assessments.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            4. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
            Privacy Policy, unless a longer retention period is required or permitted by law.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            5. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" paragraph>
                The right to access your personal information
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                The right to rectify inaccurate information
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                The right to request deletion of your information
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                The right to restrict or object to processing
              </Typography>
            </li>
          </ul>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            6. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </Typography>
          <Typography variant="body1" paragraph>
            Email: privacy@insightsnamibia.com<br />
            Phone: +264 61 123 4567<br />
            Address: Independence Avenue, Windhoek, Namibia
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;