import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  useTheme
} from '@mui/material';
import { 
  WhatsApp as WhatsAppIcon, 
  Email as EmailIcon, 
  Sms as SmsIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RequestVerification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    contactMethod: 'whatsapp',
    contactDetail: '',
    message: 'Hello, please complete your identity verification by clicking on the link below.',
  });

  // Error state
  const [errors, setErrors] = useState({
    fullName: false,
    contactDetail: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName.trim(),
      contactDetail: !formData.contactDetail.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a unique verification link
      const verificationId = Math.random().toString(36).substring(2, 15);
      const verificationLink = `${window.location.origin}/verify/${verificationId}`;
      
      // In a real app, you would send this link via the selected contact method
      console.log('Verification link generated:', verificationLink);
      console.log('Contact method:', formData.contactMethod);
      console.log('Contact detail:', formData.contactDetail);
      
      setSuccess(true);
      setActiveStep(1);
    } catch (error) {
      console.error('Error sending verification request:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContactMethodIcon = () => {
    switch (formData.contactMethod) {
      case 'whatsapp':
        return <WhatsAppIcon sx={{ fontSize: 64, color: '#25D366' }} />;
      case 'email':
        return <EmailIcon sx={{ fontSize: 64, color: theme.palette.primary.main }} />;
      case 'sms':
        return <SmsIcon sx={{ fontSize: 64, color: theme.palette.secondary.main }} />;
      default:
        return <WhatsAppIcon sx={{ fontSize: 64, color: '#25D366' }} />;
    }
  };

  const getContactMethodLabel = () => {
    switch (formData.contactMethod) {
      case 'whatsapp':
        return 'WhatsApp Number';
      case 'email':
        return 'Email Address';
      case 'sms':
        return 'Phone Number';
      default:
        return 'Contact Detail';
    }
  };

  const getContactMethodPlaceholder = () => {
    switch (formData.contactMethod) {
      case 'whatsapp':
        return '+264 81 123 4567';
      case 'email':
        return 'name@example.com';
      case 'sms':
        return '+264 81 123 4567';
      default:
        return 'Enter contact details';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 3,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Request Verification</StepLabel>
            </Step>
            <Step>
              <StepLabel>Verification Sent</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {activeStep === 0 ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Request Identity Verification
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Enter the details of the person you want to verify. We'll send them a secure link to complete the verification process.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    helperText={errors.fullName ? "Full name is required" : ""}
                    variant="outlined"
                    placeholder="Enter the full name of the person to verify"
                  />
                </Box>

                <Box>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Contact Method</FormLabel>
                    <RadioGroup
                      row
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                    >
                      <FormControlLabel 
                        value="whatsapp" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WhatsAppIcon sx={{ color: '#25D366', mr: 1 }} />
                            WhatsApp
                          </Box>
                        } 
                      />
                      <FormControlLabel 
                        value="email" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                            Email
                          </Box>
                        } 
                      />
                      <FormControlLabel 
                        value="sms" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SmsIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                            SMS
                          </Box>
                        } 
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label={getContactMethodLabel()}
                    name="contactDetail"
                    value={formData.contactDetail}
                    onChange={handleChange}
                    error={errors.contactDetail}
                    helperText={errors.contactDetail ? `${getContactMethodLabel()} is required` : ""}
                    variant="outlined"
                    placeholder={getContactMethodPlaceholder()}
                  />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Custom Message (Optional)"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Add a custom message to send with the verification link"
                  />
                </Box>

                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <ArrowForwardIcon />}
                  >
                    {loading ? 'Sending Request...' : 'Send Verification Request'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box 
              sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              <CheckIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Verification Request Sent!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              {getContactMethodIcon()}
            </Box>
            
            <Typography variant="body1" paragraph>
              We've sent a verification request to <strong>{formData.contactDetail}</strong> via {formData.contactMethod === 'whatsapp' ? 'WhatsApp' : formData.contactMethod === 'email' ? 'Email' : 'SMS'}.
            </Typography>
            
            <Typography variant="body1" paragraph>
              The recipient will receive a secure link to complete their identity verification process.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
              You'll be notified once the verification is complete.
            </Typography>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/dashboard')}
                sx={{ 
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setActiveStep(0);
                  setSuccess(false);
                  setFormData({
                    ...formData,
                    fullName: '',
                    contactDetail: ''
                  });
                }}
                sx={{ 
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                Request Another Verification
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default RequestVerification;