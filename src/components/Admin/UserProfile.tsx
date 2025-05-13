import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  position?: string;
  role: string;
  createdAt: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if current user is admin
    const currentUser = authService.getUser();
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    fetchUserData();
  }, [userId, navigate]);

  const fetchUserData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // For demo purposes, simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on userId
      const mockUser: UserData = {
        id: userId,
        name: userId === '1' ? 'John Doe' : 'Jane Smith',
        email: userId === '1' ? 'john@example.com' : 'jane@example.com',
        phone: '+1234567890',
        address: '123 Main St, Anytown, USA',
        company: 'ACME Corporation',
        position: 'Software Developer',
        role: 'user',
        createdAt: '2023-01-15'
      };
      
      setUser(mockUser);
    } catch (err) {
      setError('Failed to load user profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/users')}
          sx={{ mt: 2 }}
        >
          Back to User Management
        </Button>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        <Alert severity="warning">User not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/users')}
          sx={{ mt: 2 }}
        >
          Back to User Management
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/users')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          User Profile
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3 }}
              alt={user.name}
              src="/static/images/avatar/default.jpg"
            />
            <Box>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Chip 
                label={user.role.toUpperCase()} 
                color={user.role === 'admin' ? 'primary' : 'default'} 
                size="small" 
                sx={{ mt: 1 }} 
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            component={Link}
            to={`/admin/users/${userId}/edit`}
          >
            Edit User
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary={user.phone || 'Not provided'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Address" secondary={user.address || 'Not provided'} />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Professional Information
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="Company" secondary={user.company || 'Not provided'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Position" secondary={user.position || 'Not provided'} />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Account Information
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="User ID" secondary={user.id} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Role" secondary={user.role.charAt(0).toUpperCase() + user.role.slice(1)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Account Created" secondary={new Date(user.createdAt).toLocaleDateString()} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default UserProfile;