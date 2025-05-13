import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { businessApi } from '../../services/api';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  verificationLimit: number;
}

const SubscriptionManagement: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await businessApi.getSubscriptions();
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch subscription plans:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      if (selectedPlan) {
        await businessApi.subscribe(selectedPlan.id);
        setOpenDialog(false);
        // Refresh business data or show success message
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Subscription Plans
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {plans.map((plan) => (
            <Box 
              key={plan.id}
              sx={{ 
                flexBasis: { xs: '100%', md: 'calc(33.333% - 16px)' },
                minWidth: 280,
                flexGrow: 1
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ${plan.price}/month
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {plan.features.map((feature, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpenDialog(true);
                    }}
                  >
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Subscribe to {selectedPlan?.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Card Number"
            margin="normal"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
          />
          <TextField
            fullWidth
            label="Expiry Date"
            margin="normal"
            value={paymentDetails.expiryDate}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
          />
          <TextField
            fullWidth
            label="CVV"
            margin="normal"
            type="password"
            value={paymentDetails.cvv}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubscribe} variant="contained">
            Confirm Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SubscriptionManagement;