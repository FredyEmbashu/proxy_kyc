import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface VerificationRequest {
  id: string;
  customerName: string;
  email: string;
  status: string;
  date: string;
}

const BusinessDashboard: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({ name: '', email: '' });

  const handleCreateRequest = () => {
    const verificationLink = `https://yourapp.com/verify/${Math.random().toString(36).substr(2, 9)}`;
    // Send email with verification link
    setOpenDialog(false);
    // Add to verifications list
    setVerifications(prev => [{
      id: Date.now().toString(),
      customerName: newRequest.name,
      email: newRequest.email,
      status: 'Pending',
      date: new Date().toISOString()
    }, ...prev]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">Business Dashboard</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Verification Request
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Stats */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Paper sx={{ p: 3, minWidth: 280, flex: '1 1 auto' }}>
              <Typography variant="h6">Total Requests</Typography>
              <Typography variant="h3">{verifications.length}</Typography>
            </Paper>
          </Box>
          
          {/* Verification List */}
          <Paper sx={{ p: 3, width: '100%' }}>
            <Typography variant="h6" gutterBottom>Verification Requests</Typography>
            {verifications.map(verification => (
              <Box key={verification.id} sx={{ mb: 2, p: 2, border: '1px solid #eee' }}>
                <Typography variant="subtitle1">{verification.customerName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {verification.email} - {verification.status}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>

      {/* New Request Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>New Verification Request</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Customer Name"
            margin="normal"
            value={newRequest.name}
            onChange={(e) => setNewRequest(prev => ({ ...prev, name: e.target.value }))}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={newRequest.email}
            onChange={(e) => setNewRequest(prev => ({ ...prev, email: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateRequest} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BusinessDashboard;