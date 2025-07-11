import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, CircularProgress, Alert,
  Link, Divider, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'individual' | 'business'>('individual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(email, password);
      if (result.success && result.user) {
        const user = result.user;

        // Store login info
        localStorage.setItem('auth_token', result.token!);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('preferredAccountType', accountType);

        // Navigate to appropriate dashboard
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else if (user.accountType === 'business') {
          navigate('/business-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 2
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Insight Namibia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secure Identity Verification for Namibian Individuals and/or Businesses
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              labelId="account-type-label"
              value={accountType}
              label="Account Type"
              onChange={(e) => setAccountType(e.target.value as 'individual' | 'business')}
              disabled={loading}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>
            Don't have an account?
          </Typography>
          <Button
            component={RouterLink}
            to="./SignUp"
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;


