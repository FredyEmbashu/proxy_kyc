import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';

// Add the onUpload prop to the interface
interface DocumentUploadProps {
  onUpload?: (image: string, type: 'passport' | 'id_card' | 'drivers_license') => void;
}

// Then in your component definition
const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'passport' | 'id_card' | 'drivers_license'>('id_card');
  const [loading, setLoading] = useState(false);

  // Add this function to handle the upload completion
  const handleUploadComplete = (imageData: string, docType: 'passport' | 'id_card' | 'drivers_license') => {
    // Call the onUpload prop if it exists
    if (onUpload) {
      onUpload(imageData, docType);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove data:image/jpeg;base64, prefix
        const imageData = base64String.split(',')[1];
        handleUploadComplete(imageData, documentType);
        setLoading(false);
      };
    } catch (error) {
      console.error('Error uploading document:', error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Document Upload
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Upload your ID, Driver's License, or Passport for verification.
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Document Type</InputLabel>
        <Select
          value={documentType}
          label="Document Type"
          onChange={(e) => setDocumentType(e.target.value as 'passport' | 'id_card' | 'drivers_license')}
        >
          <MenuItem value="id_card">ID Card</MenuItem>
          <MenuItem value="drivers_license">Driver's License</MenuItem>
          <MenuItem value="passport">Passport</MenuItem>
        </Select>
      </FormControl>
      
      <Button 
        variant="contained" 
        component="label" 
        sx={{ mr: 2 }}
      >
        Select File
        <input type="file" hidden onChange={handleFileChange} accept="image/*,.pdf" />
      </Button>
      
      {file && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Document'}
        </Button>
      )}
      
      {file && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Selected file: {file.name}
        </Typography>
      )}
    </Box>
  );
};

// Add default props
// For modern TypeScript with React, we can remove defaultProps
// and use optional parameters with default values in the props interface
//   onUpload: undefined
// };

export default DocumentUpload;