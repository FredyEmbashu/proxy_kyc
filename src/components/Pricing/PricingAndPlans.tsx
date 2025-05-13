import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PricingCard from './PricingCard'; // Fix the import path

const PricingAndPlans: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePayment = async (planId: string, planType: 'individual' | 'business') => {
    setLoading(true);
    try {
      // In a real app, you would process payment through a payment gateway
      // const response = await paymentService.processPayment(planId);
      
      // For demo purposes, simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store payment completion in localStorage for demo
      localStorage.setItem('paymentCompleted', 'true');
      
      // Redirect to sign-up page with account type
      navigate(`/signup?type=${planType}`);
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Select the plan that best fits your verification needs
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4, 
            justifyContent: 'center',
            mt: 4 
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
            <PricingCard
              title="Individual Plan"
              price="N$99"
              period="per month"
              features={[
                '10 verifications per month',
                'Basic identity verification',
                'Document storage',
                'Email support'
              ]}
              buttonText="Get Started"
              onButtonClick={() => handlePayment('individual-basic', 'individual')}
              loading={loading}
            />
          </Box>
          
          <Box sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
            <PricingCard
              title="Business Starter"
              price="N$299"
              period="per month"
              features={[
                '50 verifications per month',
                'Advanced identity verification',
                'Document management',
                'Priority support',
                'API access'
              ]}
              buttonText="Get Started"
              onButtonClick={() => handlePayment('business-starter', 'business')}
              loading={loading}
              highlighted
            />
          </Box>
          
          <Box sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
            <PricingCard
              title="Enterprise"
              price="N$999"
              period="per month"
              features={[
                'Unlimited verifications',
                'Full KYC suite',
                'Custom integration',
                'Dedicated support',
                'Advanced analytics',
                'Compliance reporting'
              ]}
              buttonText="Contact Sales"
              onButtonClick={() => handlePayment('enterprise', 'business')}
              loading={loading}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingAndPlans;