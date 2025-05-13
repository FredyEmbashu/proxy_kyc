import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { Box, Typography, Paper, Button } from '@mui/material';

const plans = [
  {
    name: 'Starter',
    price: 'N$999',
    period: 'month',
    description: 'Ideal for startups testing the waters.',
    features: [
      '250 KYC verifications',
      'Basic ID validation',
      'Standard turnaround',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: 'N$2490',
    period: 'month',
    description: 'Perfect for scaling platforms and apps.',
    features: [
      '2,500 verifications',
      'Advanced ID & doc checks',
      'Webhook integrations',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'N$4990',
    period: 'month',
    description: 'Full power for high-volume businesses.',
    features: [
      'Unlimited verifications',
      'Biometrics + AML checks',
      'Dedicated manager',
      '24/7 SLA support',
    ],
    popular: false,
  },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
    // Updated to use the correct route path
    navigate('/make-payment', { state: { plan: planName } });
  };

  return (
    <Box sx={{ py: 10 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Simple, Transparent Pricing
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          No hidden fees. Pay for what you need, when you need it.
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'center', 
          gap: 4 
        }}>
          {plans.map((plan, idx) => (
            <Paper 
              key={idx}
              sx={{ 
                position: 'relative',
                width: { xs: '100%', md: 350 },
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                transition: 'all 0.3s',
                '&:hover': { 
                  transform: 'scale(1.02)', 
                  boxShadow: 6 
                },
                border: plan.popular ? '2px solid' : '1px solid',
                borderColor: plan.popular ? 'primary.main' : 'divider'
              }}
            >
              {plan.popular && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -12, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Star size={14} />
                  Most Popular
                </Box>
              )}
              
              <Typography variant="h5" gutterBottom>
                {plan.name}
              </Typography>
              
              <Typography variant="h4" color="primary" gutterBottom>
                {plan.price}
                <Typography component="span" color="text.secondary" sx={{ ml: 1, fontSize: 'body2.fontSize' }}>
                  /{plan.period}
                </Typography>
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {plan.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {plan.features.map((feature, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Check size={16} color="green" style={{ marginRight: 8 }} />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={() => handleChoosePlan(plan.name)}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  '&:hover': { 
                    transform: 'scale(1.05)' 
                  }
                }}
              >
                Choose {plan.name} Plan
              </Button>
            </Paper>
          ))}
        </Box>
        
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mt: 4 }}>
          14-day free trial. Cancel anytime. No credit card needed.
        </Typography>
      </Box>
    </Box>
  );
};

// const PaymentPlans: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Payment Plans
//       </Typography>
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: { xs: 'column', md: 'row' }, 
//         justifyContent: 'space-between', 
//         gap: 3 
//       }}>
//         {[
//           { name: 'Basic', price: 1999, description: 'Includes basic verification features.' },
//           { name: 'Standard', price: 2499, description: 'All basic features plus advanced analytics.' },
//           { name: 'Premium', price: 3990, description: 'Includes all features with priority support.' }
//         ].map((plan, idx) => (
//           <Paper 
//             key={idx} 
//             sx={{ 
//               p: 3, 
//               flex: 1, 
//               borderRadius: '12px', 
//               boxShadow: 3, 
//               transition: 'transform 0.3s ease-in-out', 
//               '&:hover': { 
//                 transform: 'scale(1.05)', 
//                 boxShadow: 8 
//               } 
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 700 }}>
//               {plan.name} Plan
//             </Typography>
//             <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
//               N${plan.price}/month
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 2 }}>
//               {plan.description}
//             </Typography>
//             <Button 
//               variant="contained" 
//               color="primary" 
//               sx={{ mt: 2 }}
//               onClick={() => navigate('/make-payment', { state: { plan: plan.name } })}
//             >
//               Choose Plan
//             </Button>
//           </Paper>
//         ))}
//       </Box>
//     </Box>
//   );
// };

const PricingAndPlans: React.FC = () => {
  return (
    <Box>
      <PricingPage />
      {/* PaymentPlans component removed */}
    </Box>
  );
};

export default PricingAndPlans;