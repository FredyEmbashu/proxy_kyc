import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Download, Print } from '@mui/icons-material';
import { jsPDF } from 'jspdf';

interface CertificateProps {
  verificationData: {
    id: string;
    name: string;
    dateVerified: string;
    expiryDate: string;
  };
}

const VerificationCertificate: React.FC<CertificateProps> = ({ verificationData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('KYC Verification Certificate', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Verification ID: ${verificationData.id}`, 20, 40);
    doc.text(`Name: ${verificationData.name}`, 20, 50);
    doc.text(`Date Verified: ${verificationData.dateVerified}`, 20, 60);
    doc.text(`Valid Until: ${verificationData.expiryDate}`, 20, 70);
    doc.save('verification-certificate.pdf');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Verification Certificate
      </Typography>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={generatePDF}
          sx={{ mr: 2 }}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </Box>
    </Paper>
  );
};

export default VerificationCertificate;