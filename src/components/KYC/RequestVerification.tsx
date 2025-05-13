import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`verification-tabpanel-${index}`}
      aria-labelledby={`verification-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface RequestVerificationProps {
  onComplete?: () => void;
}

const RequestVerification: React.FC<RequestVerificationProps> = ({ onComplete }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Individual verification form
  const [individualForm, setIndividualForm] = useState({
    name: '',
    contactType: 'email',
    contactValue: '',
    message: ''
  });
  
  // Bulk verification
  const [bulkContacts, setBulkContacts] = useState<Array<{name: string, contact: string}>>([]);
  const [bulkContactType, setBulkContactType] = useState<'email' | 'phone'>('email');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][]>([]);
  
  // Form validation
  const [formErrors, setFormErrors] = useState({
    name: false,
    contactValue: false,
    csvFile: false
  });
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setIndividualForm({
      ...individualForm,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (name && formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };
  
  const handleContactTypeChange = (event: SelectChangeEvent) => {
    setBulkContactType(event.target.value as 'email' | 'phone');
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setCsvFile(file);
      
      // Preview CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const data = lines.map(line => line.split(',').map(item => item.trim()));
        setPreviewData(data.slice(0, 5)); // Preview first 5 rows
        
        // Extract contacts from CSV
        const contacts = data.slice(1).map(row => ({
          name: row[0] || '',
          contact: row[1] || ''
        })).filter(item => item.name && item.contact);
        
        setBulkContacts(contacts);
      };
      reader.readAsText(file);
      
      // Clear error
      setFormErrors({
        ...formErrors,
        csvFile: false
      });
    }
  };
  
  const addManualContact = () => {
    if (individualForm.name && individualForm.contactValue) {
      setBulkContacts([
        ...bulkContacts,
        {
          name: individualForm.name,
          contact: individualForm.contactValue
        }
      ]);
      
      // Clear form
      setIndividualForm({
        ...individualForm,
        name: '',
        contactValue: ''
      });
    } else {
      setFormErrors({
        ...formErrors,
        name: !individualForm.name,
        contactValue: !individualForm.contactValue
      });
    }
  };
  
  const removeContact = (index: number) => {
    const updatedContacts = [...bulkContacts];
    updatedContacts.splice(index, 1);
    setBulkContacts(updatedContacts);
  };
  
  const validateIndividualForm = () => {
    const errors = {
      name: !individualForm.name,
      contactValue: !individualForm.contactValue,
      csvFile: false
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };
  
  const validateBulkForm = () => {
    const hasContacts = bulkContacts.length > 0;
    
    if (!hasContacts) {
      setFormErrors({
        ...formErrors,
        csvFile: true
      });
    }
    
    return hasContacts;
  };
  
  const handleSubmitIndividual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateIndividualForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Call onComplete after a delay
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    } catch (err) {
      setError('An error occurred while sending the verification request.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBulkForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Call onComplete after a delay
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    } catch (err) {
      setError('An error occurred while sending the bulk verification requests.');
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Verification request{bulkContacts.length > 1 ? 's' : ''} sent successfully!
        </Alert>
        <Typography variant="body1" paragraph>
          {tabValue === 0 
            ? `A verification link has been sent to ${individualForm.contactValue}.` 
            : `Verification links have been sent to ${bulkContacts.length} recipient${bulkContacts.length > 1 ? 's' : ''}.`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can track the status of your verification requests on the dashboard.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tab label="Individual Verification" />
        <Tab label="Bulk Verification" />
      </Tabs>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <TabPanel value={tabValue} index={0}>
        <form onSubmit={handleSubmitIndividual}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={individualForm.name}
            onChange={handleIndividualChange}
            margin="normal"
            error={formErrors.name}
            helperText={formErrors.name ? 'Name is required' : ''}
            disabled={loading}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Contact Method</InputLabel>
            <Select
              name="contactType"
              value={individualForm.contactType}
              onChange={handleIndividualChange}
              label="Contact Method"
              disabled={loading}
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone Number</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label={individualForm.contactType === 'email' ? 'Email Address' : 'Phone Number'}
            name="contactValue"
            value={individualForm.contactValue}
            onChange={handleIndividualChange}
            margin="normal"
            error={formErrors.contactValue}
            helperText={formErrors.contactValue ? `${individualForm.contactType === 'email' ? 'Email' : 'Phone number'} is required` : ''}
            disabled={loading}
          />
          
          <TextField
            fullWidth
            label="Custom Message (Optional)"
            name="message"
            value={individualForm.message}
            onChange={handleIndividualChange}
            margin="normal"
            multiline
            rows={3}
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Verification Request'}
          </Button>
        </form>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <form onSubmit={handleSubmitBulk}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Contact Method</InputLabel>
            <Select
              value={bulkContactType}
              onChange={handleContactTypeChange}
              label="Contact Method"
              disabled={loading}
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone Number</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Upload CSV File
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              CSV should have columns: Name, {bulkContactType === 'email' ? 'Email' : 'Phone'}
            </Typography>
            
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1 }}
              disabled={loading}
            >
              Upload CSV
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileUpload}
                disabled={loading}
              />
            </Button>
            
            {formErrors.csvFile && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                Please upload a CSV file or add contacts manually
              </Typography>
            )}
            
            {previewData.length > 0 && (
              <Paper sx={{ mt: 2, p: 2, maxHeight: 200, overflow: 'auto' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Preview:
                </Typography>
                <Box component="pre" sx={{ fontSize: '0.8rem' }}>
                  {previewData.map((row, i) => (
                    <Box key={i} sx={{ mb: 0.5 }}>
                      {row.join(', ')}
                    </Box>
                  ))}
                  {previewData.length < 5 ? '' : '...'}
                </Box>
              </Paper>
            )}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Add Contacts Manually
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={individualForm.name}
              onChange={handleIndividualChange}
              sx={{ flexGrow: 1 }}
              error={formErrors.name}
              disabled={loading}
            />
            <TextField
              label={bulkContactType === 'email' ? 'Email' : 'Phone'}
              name="contactValue"
              value={individualForm.contactValue}
              onChange={handleIndividualChange}
              sx={{ flexGrow: 1 }}
              error={formErrors.contactValue}
              disabled={loading}
            />
            <Button 
              variant="contained" 
              onClick={addManualContact}
              disabled={loading}
            >
              Add
            </Button>
          </Box>
          
          {bulkContacts.length > 0 && (
            <Paper sx={{ mt: 2, maxHeight: 200, overflow: 'auto' }}>
              <List dense>
                {bulkContacts.map((contact, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => removeContact(index)} disabled={loading}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={contact.name}
                      secondary={contact.contact}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading || bulkContacts.length === 0}
          >
            {loading ? <CircularProgress size={24} /> : `Send ${bulkContacts.length} Verification Request${bulkContacts.length !== 1 ? 's' : ''}`}
          </Button>
        </form>
      </TabPanel>
    </Box>
  );
};

export default RequestVerification;