import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  MenuItem,
} from '@mui/material';


// To this:
import { useApi } from '../../hooks/useApi';

interface VerificationRecord {
  id: string;
  customerName: string;
  status: string;
  date: string;
  businessName?: string;
}

const AdminDashboard: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationRecord[]>([]);
  const [filter, setFilter] = useState('all');
  const { get, put } = useApi();

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await get('/api/verifications');
      if (response) {
        setVerifications(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch verifications:', error);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await put(`/api/verifications/${id}/status`, { status: newStatus });
      fetchVerifications();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'grid', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Verifications</Typography>
              <Typography variant="h3">{verifications.length}</Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Verification Records</Typography>
                <TextField
                  select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  sx={{ width: 200 }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </TextField>
              </Box>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {verifications
                    .filter(v => filter === 'all' || v.status === filter)
                    .map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell>{verification.id}</TableCell>
                        <TableCell>{verification.customerName}</TableCell>
                        <TableCell>{verification.businessName}</TableCell>
                        <TableCell>{verification.date}</TableCell>
                        <TableCell>
                          <Chip
                            label={verification.status}
                            color={
                              verification.status === 'completed' ? 'success' :
                              verification.status === 'rejected' ? 'error' : 'warning'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            onClick={() => handleStatusUpdate(verification.id, 'completed')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleStatusUpdate(verification.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;