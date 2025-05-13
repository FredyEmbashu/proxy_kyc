import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
  Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

// Remove this line:
// const authService = new AuthService();

interface SignUpProps {
  accountType?: 'individual' | 'business';
}

const SignUp: React.FC<SignUpProps> = ({ accountType = 'individual' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Check if payment was completed
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  useEffect(() => {
    // In a real app, verify the payment token from URL or session
    const params = new URLSearchParams(location.search);
    const paymentToken = params.get('paymentToken');
    
    if (paymentToken) {
      // Verify payment token with backend
      setPaymentVerified(true);
    } else {
      // Check localStorage for demo purposes
      const paymentCompleted = localStorage.getItem('paymentCompleted');
      if (paymentCompleted === 'true') {
        setPaymentVerified(true);
      } else {
        // Redirect to payment page if no payment was made
        navigate('/payment-plans');
      }
    }
    
    // Get account type from URL if present
    const type = params.get('type');
    if (type === 'business' || type === 'individual') {
      setFormData(prev => ({
        ...prev,
        accountType: type
      }));
    }
  }, [location, navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    accountType: accountType,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    registrationNumber: '',
    phone: '',
    address: '',
    industry: '',
  });
  
  // Form validation
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    companyName: false,
    registrationNumber: false,
    phone: false,
    address: false,
    industry: false,
  });
  
  // Update the handleChange function to use a more specific type
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
    
    // Clear error when field is edited
    if (name && formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };
  
  const validateStep = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (activeStep === 0) {
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = true;
        valid = false;
      }
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = true;
        valid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = true;
        valid = false;
      }
    } else if (activeStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = true;
        valid = false;
      }
      if (formData.accountType === 'business') {
        if (!formData.companyName.trim()) {
          newErrors.companyName = true;
          valid = false;
        }
        if (!formData.registrationNumber.trim()) {
          newErrors.registrationNumber = true;
          valid = false;
        }
        if (!formData.industry) {
          newErrors.industry = true;
          valid = false;
        }
      }
      if (!formData.phone.trim()) {
        newErrors.phone = true;
        valid = false;
      }
      if (!formData.address.trim()) {
        newErrors.address = true;
        valid = false;
      }
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 1) {
        handleSignUp();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your API
      const result = await authService.register(formData);
      
      if (result.success) {
        setSuccess(true);
        // Clear payment verification from localStorage for demo
        localStorage.removeItem('paymentCompleted');
        
        // Redirect after a delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const steps = ['Account Details', formData.accountType === 'business' ? 'Business Information' : 'Personal Information'];
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Account Type</InputLabel>
              <Select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                label="Account Type"
              >
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              error={formErrors.email}
              helperText={formErrors.email ? 'Valid email is required' : ''}
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              error={formErrors.password}
              helperText={formErrors.password ? 'Password must be at least 8 characters' : ''}
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              error={formErrors.confirmPassword}
              helperText={formErrors.confirmPassword ? 'Passwords do not match' : ''}
              disabled={loading}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              error={formErrors.fullName}
              helperText={formErrors.fullName ? 'Full name is required' : ''}
              disabled={loading}
            />
            
            {formData.accountType === 'business' && (
              <>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  margin="normal"
                  error={formErrors.companyName}
                  helperText={formErrors.companyName ? 'Company name is required' : ''}
                  disabled={loading}
                />
                
                <TextField
                  fullWidth
                  label="Business Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  margin="normal"
                  error={formErrors.registrationNumber}
                  helperText={formErrors.registrationNumber ? 'Registration number is required' : ''}
                  disabled={loading}
                />
                
                <FormControl 
                  fullWidth 
                  margin="normal"
                  error={formErrors.industry}
                >
                  <InputLabel>Industry</InputLabel>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    label="Industry"
                  >
                    <MenuItem value="finance">Finance & Banking</MenuItem>
                    <MenuItem value="retail">Retail & Commerce</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="healthcare">Healthcare</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                    <MenuItem value="manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {formErrors.industry && (
                    <FormHelperText>Industry is required</FormHelperText>
                  )}
                </FormControl>
              </>
            )}
            
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              error={formErrors.phone}
              helperText={formErrors.phone ? 'Phone number is required' : ''}
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              error={formErrors.address}
              helperText={formErrors.address ? 'Address is required' : ''}
              disabled={loading}
              multiline
              rows={2}
            />
          </Box>
        );
      default:
        return null;
    }
  };
  
  if (!paymentVerified) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom color="error">
          Payment Required
        </Typography>
        <Typography variant="body1" paragraph>
          You need to complete payment before creating an account.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/payment-plans')}
        >
          View Payment Plans
        </Button>
      </Paper>
    );
  }
  
  if (success) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Registration Successful!
        </Typography>
        <Typography variant="body1" paragraph>
          Your account has been created successfully. You will be redirected to the dashboard.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Redirecting to dashboard...
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Create Your Account
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {renderStepContent()}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0 || loading}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : activeStep === steps.length - 1 ? (
            'Create Account'
          ) : (
            'Next'
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default SignUp;