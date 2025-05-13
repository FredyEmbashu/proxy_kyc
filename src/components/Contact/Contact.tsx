import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            We're here to help with any questions about our identity verification solutions
          </Typography>
          <Divider sx={{ mb: 6 }} />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4 
        }}>
          {/* Contact Information */}
          <Box sx={{ flex: { xs: '1', md: '5' } }}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: 3,
              height: '100%',
              border: '1px solid rgba(0,0,0,0.08)'
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Get in Touch
              </Typography>
              
              <List sx={{ mb: 4 }}>
                <ListItem disableGutters>
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Address" 
                    secondary="Independence Avenue, Windhoek, Namibia" 
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                
                <ListItem disableGutters>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary="info@insightsnamibia.com" 
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                
                <ListItem disableGutters>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone" 
                    secondary="+264 61 123 4567" 
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
                Business Hours
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>Monday - Friday:</Typography>
                <Typography variant="body2">8:00 AM - 5:00 PM</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>Saturday:</Typography>
                <Typography variant="body2">9:00 AM - 1:00 PM</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" fontWeight={500}>Sunday:</Typography>
                <Typography variant="body2">Closed</Typography>
              </Box>
            </Paper>
          </Box>
          
          {/* Contact Form */}
          <Box sx={{ flex: { xs: '1', md: '7' } }}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)'
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Send Us a Message
              </Typography>
              
              {formSubmitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Thank you for your message!
                  </Typography>
                  <Typography variant="body1">
                    We've received your inquiry and will get back to you as soon as possible.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mt: 3 }}
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Box>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{ 
                          py: 1.5, 
                          px: 4,
                          borderRadius: 2
                        }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;