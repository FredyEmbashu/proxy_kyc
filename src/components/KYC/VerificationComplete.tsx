import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import jsPDF from 'jspdf';

const VerificationComplete: React.FC = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Verification Complete', 10, 10);
    doc.text('Thank you for completing the verification process.', 10, 20);
    doc.save('verification.pdf');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Verification Complete
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Your verification process is complete. You can download the confirmation below.
      </Typography>
      <Button variant="contained" color="primary" onClick={generatePDF}>
        Download PDF
      </Button>
    </Box>
  );
};

export default VerificationComplete;