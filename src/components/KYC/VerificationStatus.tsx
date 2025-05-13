import { useState } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
// Box is already imported in the lower section of the file
import CustomerForm from './CustomerForm';
import { default as VerificationStatusComponent } from './VerificationStatus';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const verificationSteps = [
  {
    label: 'Personal Information',
    status: 'completed' as const,
    description: 'Basic personal information collection',
  },
  {
    label: 'Document Verification',
    status: 'in_progress' as const,
    description: 'Upload and verify identification documents',
  },
  {
    label: 'Face Verification',
    status: 'pending' as const,
    description: 'Facial recognition verification',
  },
  {
    label: 'Final Review',
    status: 'pending' as const,
    description: 'Final review of all submitted information',
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  const handleStepComplete = (step: number) => {
    setCurrentStep(step + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <CustomerForm onSubmit={handleSubmit} />
        <Box sx={{ mt: 4 }}>
          <VerificationStatus
             steps={verificationSteps}
             currentStep={currentStep}
             onStepComplete={handleStepComplete}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export { App };

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

interface VerificationStep {
  label: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  description: string;
}

interface VerificationStatusProps {
  steps: VerificationStep[];
  currentStep: number;
  onStepComplete?: (step: number) => void;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  steps,
  currentStep,
  onStepComplete,
}) => {
  const getStepIcon = (status: VerificationStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'in_progress':
        return <CircularProgress size={20} />;
      default:
        return <PendingIcon color="disabled" />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Verification Status
      </Typography>

      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={() => getStepIcon(step.status)}
              error={step.status === 'error'}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Typography>{step.description}</Typography>
                {step.status === 'in_progress' && (
                  <Box sx={{ mt: 2 }}>
                    <CircularProgress size={24} />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      Processing...
                    </Typography>
                  </Box>
                )}
                {step.status === 'error' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onStepComplete?.(index)}
                    sx={{ mt: 2 }}
                  >
                    Retry
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default VerificationStatus;