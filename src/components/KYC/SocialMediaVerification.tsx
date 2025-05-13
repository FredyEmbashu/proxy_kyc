import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Language as WebIcon,
  CheckCircle as VerifiedIcon,
} from '@mui/icons-material';
import { socialMediaService } from '../../services/SocialMediaService';

interface SocialMediaVerificationProps {
  email?: string;
  phone?: string;
  fullName?: string;
  onVerificationComplete?: (verified: boolean) => void;
}

const SocialMediaVerification: React.FC<SocialMediaVerificationProps> = ({
  email,
  phone,
  fullName,
  onVerificationComplete
}) => {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [webPresence, setWebPresence] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all([
        email ? socialMediaService.searchByEmail(email) : [],
        phone ? socialMediaService.searchByPhone(phone) : [],
        fullName ? socialMediaService.searchWebPresence(fullName) : [],
      ]);

      setProfiles([...results[0], ...results[1]]);
      setWebPresence(results[2]);
      onVerificationComplete?.(results.some(r => r.length > 0));
    } catch (err) {
      setError('Failed to verify social media presence');
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <LinkedInIcon color="primary" />;
      case 'whatsapp':
        return <WhatsAppIcon color="success" />;
      default:
        return <WebIcon />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Social Media Verification
      </Typography>

      <Button
        variant="contained"
        onClick={handleVerification}
        disabled={loading || (!email && !phone && !fullName)}
        fullWidth
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Verify Social Media Presence'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {profiles.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Social Media Profiles
          </Typography>
          <List>
            {profiles.map((profile, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {getPlatformIcon(profile.platform)}
                </ListItemIcon>
                <ListItemText
                  primary={`${profile.fullName} (${profile.platform})`}
                  secondary={`Username: ${profile.username} | Joined: ${profile.joinDate}`}
                />
                {profile.verified && (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified"
                    color="success"
                    size="small"
                  />
                )}
              </ListItem>
            ))}
          </List>
        </>
      )}

      {webPresence.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Web Presence
          </Typography>
          <List>
            {webPresence.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {item.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        Source: {item.source}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default SocialMediaVerification;