import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, CircularProgress, Alert,
  Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem,
  SelectChangeEvent, FormHelperText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

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

  // Bypass payment verification for demo
  const [paymentVerified, setPaymentVerified] = useState(true);

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Set payment as verified (demo mode)
    setPaymentVerified(true);

    // Get account type from query
    const type = params.get('type');
    if (type === 'business' || type === 'individual') {
      setFormData(prev => ({ ...prev, accountType: type }));
    }

    // Auto-fill form for demo users
    const demoEmail = params.get('demo');
    const demoUsers: any = {
      'admin@example.com': { fullName: 'Admin User', accountType: 'individual' },
      'user@example.com': { fullName: 'Regular User', accountType: 'individual' },
      'business@example.com': {
        fullName: 'Business User',
        accountType: 'business',
        companyName: 'Example Corp',
        registrationNumber: 'BRN-2025',
        industry: 'technology'
      }
    };

    if (demoEmail && demoUsers[demoEmail]) {
      setFormData(prev => ({
        ...prev,
        email: demoEmail,
        password: 'password123',
        confirmPassword: 'password123',
        ...demoUsers[demoEmail]
      }));
    }
  }, [location]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: false });
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
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.register(formData);
      if (result.success) {
        setSuccess(true);
        localStorage.removeItem('paymentCompleted');

        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration.');
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
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email}
              onChange={handleChange} margin="normal" error={formErrors.email}
              helperText={formErrors.email && 'Valid email is required'} disabled={loading} />
            <TextField fullWidth label="Password" name="password" type="password" value={formData.password}
              onChange={handleChange} margin="normal" error={formErrors.password}
              helperText={formErrors.password && 'Minimum 8 characters'} disabled={loading} />
            <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password"
              value={formData.confirmPassword} onChange={handleChange} margin="normal"
              error={formErrors.confirmPassword} helperText={formErrors.confirmPassword && 'Passwords do not match'}
              disabled={loading} />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName}
              onChange={handleChange} margin="normal" error={formErrors.fullName}
              helperText={formErrors.fullName && 'Required'} disabled={loading} />
            {formData.accountType === 'business' && (
              <>
                <TextField fullWidth label="Company Name" name="companyName" value={formData.companyName}
                  onChange={handleChange} margin="normal" error={formErrors.companyName}
                  helperText={formErrors.companyName && 'Required'} disabled={loading} />
                <TextField fullWidth label="Registration Number" name="registrationNumber"
                  value={formData.registrationNumber} onChange={handleChange} margin="normal"
                  error={formErrors.registrationNumber} helperText={formErrors.registrationNumber && 'Required'}
                  disabled={loading} />
                <FormControl fullWidth margin="normal" error={formErrors.industry}>
                  <InputLabel>Industry</InputLabel>
                  <Select name="industry" value={formData.industry} onChange={handleChange} label="Industry">
                    <MenuItem value="finance">Finance</MenuItem>
                    <MenuItem value="retail">Retail</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="healthcare">Healthcare</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                    <MenuItem value="manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {formErrors.industry && <FormHelperText>Industry is required</FormHelperText>}
                </FormControl>
              </>
            )}
            <TextField fullWidth label="Phone" name="phone" value={formData.phone}
              onChange={handleChange} margin="normal" error={formErrors.phone}
              helperText={formErrors.phone && 'Required'} disabled={loading} />
            <TextField fullWidth label="Address" name="address" value={formData.address}
              onChange={handleChange} margin="normal" error={formErrors.address}
              helperText={formErrors.address && 'Required'} disabled={loading} multiline rows={2} />
          </Box>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Welcome, {formData.fullName || 'User'}!
        </Typography>
        <Typography variant="body1" paragraph>
          You registered as a <strong>{formData.accountType === 'business' ? 'Business' : 'Individual'}</strong> account.
        </Typography>
        {formData.accountType === 'business' && (
          <>
            <Typography variant="body2" paragraph><strong>Company:</strong> {formData.companyName}</Typography>
            <Typography variant="body2" paragraph><strong>Reg #:</strong> {formData.registrationNumber}</Typography>
            <Typography variant="body2" paragraph><strong>Industry:</strong> {formData.industry}</Typography>
          </>
        )}
        <Typography variant="body2" color="text.secondary">
          Redirecting to dashboard...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Create Your Account</Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {renderStepContent()}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button disabled={activeStep === 0 || loading} onClick={handleBack}>Back</Button>
        <Button variant="contained" onClick={handleNext} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SignUp;
