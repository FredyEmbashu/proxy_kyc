import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { authService } from '../../services/authService';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const PlanSelection: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // Sample plans
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      features: [
        'Basic KYC verification',
        'Document authentication',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 29.99,
      recommended: true,
      features: [
        'Advanced KYC verification',
        'Document authentication',
        'Biometric verification',
        'Priority email support',
        'API access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99.99,
      features: [
        'Enterprise KYC verification',
        'Document authentication',
        'Biometric verification',
        'Risk scoring',
        '24/7 phone support',
        'Dedicated account manager',
        'Custom API integration'
      ]
    }
  ];

  const handleSelectPlan = async (planId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.selectPlan(planId);
      
      if (result.success && result.redirectUrl) {
        navigate(result.redirectUrl);
      } else {
        setError(result.message || 'Failed to select plan');
        setShowError(true);
        
        // If not authenticated, redirect to login
        if (result.redirectUrl === '/login') {
          // Store the selected plan in session storage to retrieve after login
          sessionStorage.setItem('selectedPlan', planId);
          navigate('/login', { state: { from: '/pricing-plans' } });
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Select the plan that best fits your verification needs
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 3, 
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            sx={{ 
              maxWidth: 350, 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              border: plan.recommended ? '2px solid #2196f3' : 'none',
              position: 'relative'
            }}
          >
            {plan.recommended && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#2196f3',
                color: 'white',
                px: 2,
                py: 0.5,
                borderBottomLeftRadius: 8
              }}>
                Recommended
              </Box>
            )}
            
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {plan.name}
              </Typography>
              
              <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                ${plan.price}
                <Typography variant="body2" component="span" color="text.secondary">
                  /month
                </Typography>
              </Typography>
              
              <Box component="ul" sx={{ pl: 2 }}>
                {plan.features.map((feature, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 1 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </CardContent>
            
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                fullWidth 
                variant={plan.recommended ? "contained" : "outlined"} 
                color="primary"
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Select Plan'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      
      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlanSelection;