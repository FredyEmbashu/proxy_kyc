import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  VerifiedUser,
  BusinessCenter,
  Warning,
  Info
} from '@mui/icons-material';
import notificationService, { Notification } from '../../services/NotificationService';
import { useNavigate } from 'react-router-dom';

interface NotificationCenterProps {
  userId?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  userId = 'user123' // Default value
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const userNotifications = await notificationService.getUserNotifications(userId);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, [userId]);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      await notificationService.markAsRead(notification.id!);
      // Update local state
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      ));
    }
    
    // Navigate based on notification type
    if (notification.type === 'verification_request' && notification.metadata?.requestId) {
      navigate(`/admin/verification-requests/${notification.metadata.requestId}`);
    } else if (notification.type === 'verification_approved') {
      navigate('/dashboard');
    }
    
    handleClose();
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'verification_request':
      case 'verification_approved':
      case 'verification_rejected':
        return <VerifiedUser />;
      case 'document_uploaded':
        return <BusinessCenter />;
      default:
        return <Info />;
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'verification_approved':
        return '#4caf50'; // green
      case 'verification_rejected':
        return '#f44336'; // red
      case 'verification_request':
        return '#2196f3'; // blue
      default:
        return '#9e9e9e'; // grey
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const open = Boolean(anchorEl);
  
  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        {!loading && notifications.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No notifications yet
            </Typography>
          </Box>
        )}
        
        {!loading && notifications.length > 0 && (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  onClick={() => handleNotificationClick(notification)}
                  sx={{ 
                    backgroundColor: notification.read ? 'inherit' : 'rgba(33, 150, 243, 0.08)',
                    '&:hover': {
                      backgroundColor: notification.read ? 'rgba(0, 0, 0, 0.04)' : 'rgba(33, 150, 243, 0.12)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography variant="body2" component="span" display="block">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      fontWeight: notification.read ? 'normal' : 'bold'
                    }}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
        
        {notifications.length > 0 && (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Button size="small" onClick={() => navigate('/notifications')}>
              View All
            </Button>
          </Box>
        )}
      </Popover>
    </>
  );
};

// Change the export line at the bottom:
export default NotificationCenter;