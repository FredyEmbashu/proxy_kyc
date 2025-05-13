import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { 
  CreditCard as CreditCardIcon, 
  AccountBalance as BankIcon, 
  Payment as PaymentIcon 
} from '@mui/icons-material';

const MakePayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract plan from navigation state, default to 'Starter' if not provided
  const [selectedPlan, setSelectedPlan] = useState(
    location.state?.plan || 'Starter'
  );
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const planPrices = {
    'Starter': 999,
    'Growth': 2490,
    'Enterprise': 4990,
    'Basic': 1999,
    'Standard': 2499,
    'Premium': 3990
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPayment = () => {
    // Implement payment submission logic
    alert(`Processing payment for ${selectedPlan} plan`);
    navigate('/verification-process');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      p: 3
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: 600, 
          p: 4, 
          borderRadius: 3 
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Complete Your Payment
        </Typography>
        
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          borderRadius: 2, 
          mb: 3 
        }}>
          <Typography variant="h6">
            Selected Plan: {selectedPlan}
          </Typography>
          <Typography variant="body1" color="primary">
            Total Amount: N${planPrices[selectedPlan as keyof typeof planPrices]}
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Select Payment Method
        </Typography>
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <RadioGroup 
            row 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel 
              value="credit" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ mr: 1 }} />
                  Credit Card
                </Box>
              } 
            />
            <FormControlLabel 
              value="bank" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BankIcon sx={{ mr: 1 }} />
                  Bank Transfer
                </Box>
              } 
            />
            <FormControlLabel 
              value="other" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PaymentIcon sx={{ mr: 1 }} />
                  Other Methods
                </Box>
              } 
            />
          </RadioGroup>
        </FormControl>
        
        <Divider sx={{ mb: 3 }}>Payment Details</Divider>
        
        <Stack spacing={3}>
          <TextField
            fullWidth
            name="cardName"
            label="Name on Card"
            value={cardDetails.cardName}
            onChange={handleCardDetailsChange}
            variant="outlined"
          />
          
          <TextField
            fullWidth
            name="cardNumber"
            label="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
            variant="outlined"
            inputProps={{ maxLength: 16 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              name="expiryDate"
              label="Expiry Date"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={handleCardDetailsChange}
              variant="outlined"
            />
            
            <TextField
              fullWidth
              name="cvv"
              label="CVV"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              variant="outlined"
              inputProps={{ maxLength: 3 }}
            />
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmitPayment}
            sx={{ mt: 2, py: 1.5 }}
          >
            Complete Payment
          </Button>
        </Stack>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mt: 3 }}
        >
          Secure payment powered by our trusted payment gateway
        </Typography>
      </Paper>
    </Box>
  );
};

export default MakePayment;