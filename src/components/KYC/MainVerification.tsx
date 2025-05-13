import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import FaceIcon from '@mui/icons-material/Face';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const MainVerification: React.FC = () => {
  const navigate = useNavigate();

  const verificationSteps = [
    {
      title: 'Personal Information',
      icon: <PersonIcon fontSize="large" />,
      path: '/personal',  // Simplified path
      description: 'Enter your personal details'
    },
    {
      title: 'Document Upload',
      icon: <DocumentScannerIcon fontSize="large" />,
      path: '/documents',  // Simplified path
      description: 'Upload required documents'
    },
    {
      title: 'Face Capture',
      icon: <FaceIcon fontSize="large" />,
      path: '/face',  // Simplified path
      description: 'Take a selfie for verification'
    },
    {
      title: 'Verification Status',
      icon: <AssignmentTurnedInIcon fontSize="large" />,
      path: '/status',  // Simplified path
      description: 'Check your verification status'
    }
  ];

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        KYC Verification
      </Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: {
        xs: '1fr',
        md: '1fr 1fr',
        lg: 'repeat(4, 1fr)'
      }}}>
        {verificationSteps.map((step, index) => (
          <Item 
            key={index} 
            elevation={3}
            onClick={() => handleNavigation(step.path)}
          >
            {step.icon}
            <Typography variant="h6" sx={{ mt: 2 }}>
              {step.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {step.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation(step.path);
              }}
            >
              Start
            </Button>
          </Item>
        ))}
      </Box>
    </Container>
  );
};

export default MainVerification;