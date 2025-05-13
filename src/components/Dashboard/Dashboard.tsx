import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CircularProgress, 
  Divider, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar, 
  Chip, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Tabs,
  Tab,
  useTheme,
  Menu,
  MenuItem,
  LinearProgress,
  Link,
  Stack
} from '@mui/material';
import {
  PersonOutline as PersonIcon,
  AssessmentOutlined as AssessmentIcon,
  VerifiedUser as VerifiedUserIcon,
  Warning as WarningIcon,
  PendingOutlined as PendingIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  DateRange as DateRangeIcon,
  Download as DownloadIcon,
  Description as DescriptionIcon,
  RemoveRedEye as ViewIcon,
  PhotoCamera as PhotoCameraIcon,
  CreditCard as CreditCardIcon,
  Face as FaceIcon,
  QueryStats as QueryStatsIcon,
  PictureAsPdf as PdfIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Mock data for the dashboard
const statisticsData = {
  totalVerifications: 2153,
  completedVerifications: 1850,
  pendingVerifications: 218,
  rejectedVerifications: 85,
  totalUsers: 1892,
  activeUsers: 1456,
  verificationRate: 86,
  averageCompletionTime: 5.2, // in minutes
  documentRejectionRate: 7.8,
  weeklyVerifications: 342,
  monthlyVerifications: 1245
};

const pieChartData = [
  { name: 'Completed', value: 1850, color: '#4caf50' },
  { name: 'Pending', value: 218, color: '#ff9800' },
  { name: 'Rejected', value: 85, color: '#f44336' }
];

const verificationTrendData = [
  { name: 'Jan', completed: 120, pending: 20, rejected: 10 },
  { name: 'Feb', completed: 150, pending: 22, rejected: 8 },
  { name: 'Mar', completed: 180, pending: 25, rejected: 12 },
  { name: 'Apr', completed: 220, pending: 30, rejected: 15 },
  { name: 'May', completed: 280, pending: 35, rejected: 20 },
  { name: 'Jun', completed: 350, pending: 40, rejected: 10 },
  { name: 'Jul', completed: 400, pending: 46, rejected: 10 },
  { name: 'Aug', completed: 450, pending: 30, rejected: 12 },
  { name: 'Sep', completed: 500, pending: 25, rejected: 8 },
  { name: 'Oct', completed: 550, pending: 40, rejected: 12 },
  { name: 'Nov', completed: 600, pending: 50, rejected: 15 },
  { name: 'Dec', completed: 650, pending: 55, rejected: 20 }
];

const documentTypeData = [
  { name: 'ID Card', value: 920 },
  { name: 'Passport', value: 545 },
  { name: 'Driver License', value: 385 }
];

const recentVerifications = [
  {
    id: 'VER-2023-001',
    user: 'John Doe',
    email: 'john.doe@example.com',
    status: 'completed',
    documentType: 'ID Card',
    date: '2023-12-10T14:32:00',
    faceMatchScore: 92,
    documentAuthScore: 95,
    riskLevel: 'low',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'VER-2023-002',
    user: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'pending',
    documentType: 'Passport',
    date: '2023-12-09T11:15:00',
    faceMatchScore: null,
    documentAuthScore: null,
    riskLevel: null,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'VER-2023-003',
    user: 'Michael Brown',
    email: 'michael.brown@example.com',
    status: 'completed',
    documentType: 'Driver License',
    date: '2023-12-08T09:45:00',
    faceMatchScore: 88,
    documentAuthScore: 93,
    riskLevel: 'low',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'VER-2023-004',
    user: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    status: 'rejected',
    documentType: 'ID Card',
    date: '2023-12-07T16:28:00',
    faceMatchScore: 62,
    documentAuthScore: 45,
    riskLevel: 'high',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'VER-2023-005',
    user: 'David Wilson',
    email: 'david.wilson@example.com',
    status: 'completed',
    documentType: 'Passport',
    date: '2023-12-06T13:12:00',
    faceMatchScore: 90,
    documentAuthScore: 91,
    riskLevel: 'low',
    avatar: '/api/placeholder/40/40'
  }
];

interface VerificationDetailsProps {
  open: boolean;
  handleClose: () => void;
  verification: any;
}

// VerificationDetailsDialog component
const VerificationDetailsDialog: React.FC<VerificationDetailsProps> = ({ open, handleClose, verification }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Verification Details: {verification?.id}</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={600}>User Information</Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={verification?.avatar} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="body1" fontWeight={500}>{verification?.user}</Typography>
              <Typography variant="body2" color="text.secondary">{verification?.email}</Typography>
            </Box>
            <Chip 
              label={verification?.status === 'completed' ? 'Verified' : verification?.status === 'pending' ? 'Pending' : 'Rejected'} 
              color={verification?.status === 'completed' ? 'success' : verification?.status === 'pending' ? 'warning' : 'error'}
              size="small"
              sx={{ ml: 2 }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, flex: '1 1 30%', minWidth: '180px' }}>
              <Typography variant="body2" color="text.secondary">Document Type</Typography>
              <Typography variant="body1" fontWeight={500}>{verification?.documentType}</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, flex: '1 1 30%', minWidth: '180px' }}>
              <Typography variant="body2" color="text.secondary">Verification Date</Typography>
              <Typography variant="body1" fontWeight={500}>
                {new Date(verification?.date).toLocaleDateString()}
              </Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, flex: '1 1 30%', minWidth: '180px' }}>
              <Typography variant="body2" color="text.secondary">Risk Level</Typography>
              <Typography 
                variant="body1" 
                fontWeight={500}
                color={verification?.riskLevel === 'low' ? 'success.main' : verification?.riskLevel === 'medium' ? 'warning.main' : 'error.main'}
              >
                {verification?.riskLevel ? verification.riskLevel.charAt(0).toUpperCase() + verification.riskLevel.slice(1) : 'N/A'}
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="verification details tabs">
            <Tab label="Verification Results" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Documents" icon={<DescriptionIcon />} iconPosition="start" />
            <Tab label="Biometrics" icon={<FaceIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>Verification Scores</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Paper sx={{ p: 2, borderRadius: 2, flex: '1 1 45%', minWidth: '300px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FaceIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="subtitle2">Face Match</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={verification?.faceMatchScore || 0} 
                      size={60}
                      thickness={4}
                      sx={{ 
                        color: verification?.faceMatchScore > 80 ? 'success.main' : 
                          verification?.faceMatchScore > 60 ? 'warning.main' : 'error.main'
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" fontWeight={700}>
                        {verification?.faceMatchScore ? `${Math.round(verification.faceMatchScore)}%` : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {verification?.faceMatchScore > 80 ? 'Strong Match' : 
                        verification?.faceMatchScore > 60 ? 'Possible Match' : 
                        verification?.faceMatchScore ? 'No Match' : 'Pending'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Confidence score between selfie and document photo
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              
              <Paper sx={{ p: 2, borderRadius: 2, flex: '1 1 45%', minWidth: '300px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CreditCardIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="subtitle2">Document Authenticity</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={verification?.documentAuthScore || 0} 
                      size={60}
                      thickness={4}
                      sx={{ 
                        color: verification?.documentAuthScore > 80 ? 'success.main' : 
                          verification?.documentAuthScore > 60 ? 'warning.main' : 'error.main'
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" fontWeight={700}>
                        {verification?.documentAuthScore ? `${Math.round(verification.documentAuthScore)}%` : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {verification?.documentAuthScore > 80 ? 'Authentic' : 
                        verification?.documentAuthScore > 60 ? 'Possibly Authentic' : 
                        verification?.documentAuthScore ? 'Suspicious' : 'Pending'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Security features verification score
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Typography variant="subtitle1" gutterBottom fontWeight={600} sx={{ mt: 3 }}>Additional Checks</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Check Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Address Verification</TableCell>
                    <TableCell>
                      <Chip 
                        label="Verified" 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>Address matches with records</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PEP Check</TableCell>
                    <TableCell>
                      <Chip 
                        label="Cleared" 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>Not listed on any PEP database</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Watch List</TableCell>
                    <TableCell>
                      <Chip 
                        label="Cleared" 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>Not found on any watch list</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Social Media Presence</TableCell>
                    <TableCell>
                      <Chip 
                        label="Found" 
                        size="small" 
                        color="info"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>2 platforms with consistent information</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>Document Images</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Paper sx={{ p: 2, borderRadius: 2, flex: '1 1 45%', minWidth: '300px' }}>
                <Typography variant="subtitle2" gutterBottom>ID Front Side</Typography>
                <Box 
                  sx={{ 
                    height: 220,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(/api/placeholder/400/250)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 1
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Button size="small" startIcon={<ViewIcon />}>View</Button>
                  <Button size="small" startIcon={<DownloadIcon />}>Download</Button>
                </Box>
              </Paper>
              
              <Paper sx={{ p: 2, borderRadius: 2, flex: '1 1 45%', minWidth: '300px' }}>
                <Typography variant="subtitle2" gutterBottom>ID Back Side</Typography>
                <Box 
                  sx={{ 
                    height: 220,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(/api/placeholder/400/250)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 1
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Button size="small" startIcon={<ViewIcon />}>View</Button>
                  <Button size="small" startIcon={<DownloadIcon />}>Download</Button>
                </Box>
              </Paper>
            </Box>

            <Typography variant="subtitle1" gutterBottom fontWeight={600} sx={{ mt: 3 }}>
              Document Information
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Document Number</TableCell>
                    <TableCell>AB123456789</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Full Name</TableCell>
                    <TableCell>{verification?.user}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Date of Birth</TableCell>
                    <TableCell>15 May 1985</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Nationality</TableCell>
                    <TableCell>Namibian</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Document Issue Date</TableCell>
                    <TableCell>10 Jan 2018</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Document Expiry Date</TableCell>
                    <TableCell>10 Jan 2028</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 500 }}>Address</TableCell>
                    <TableCell>123 Independence Ave, Windhoek, Namibia</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                startIcon={<PdfIcon />}
              >
                Download Summary Report
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<DownloadIcon />}
              >
                Download Full KYC Package
              </Button>
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>Biometric Data</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Paper sx={{ p: 2, borderRadius: 2, flex: '1 1 45%', minWidth: '300px' }}>
                <Typography variant="subtitle2" gutterBottom>Selfie Image</Typography>
                <Box 
                  sx={{ 
                    height: 220,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(/api/placeholder/400/250)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 1
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Button size="small" startIcon={<ViewIcon />}>View</Button>
                  <Button size="small" startIcon={<DownloadIcon />}>Download</Button>
                </Box>
              </Paper>
              
              <Paper sx={{ p: 2, borderRadius: 2, flex: '1 1 45%', minWidth: '300px' }}>
                <Typography variant="subtitle2" gutterBottom>Face Match Analysis</Typography>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Face Match Score
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={verification?.faceMatchScore || 0} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          bgcolor: verification?.faceMatchScore > 80 ? 'success.main' : 
                            verification?.faceMatchScore > 60 ? 'warning.main' : 'error.main',
                        }
                      }} 
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">0%</Typography>
                      <Typography variant="caption" fontWeight="bold">
                        {verification?.faceMatchScore ? `${Math.round(verification.faceMatchScore)}%` : 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">100%</Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Key Points
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2">
                      Facial features match with high confidence
                    </Typography>
                    <Typography component="li" variant="body2">
                      No signs of digital manipulation detected
                    </Typography>
                    <Typography component="li" variant="body2">
                      Live detection passed (blink test)
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Typography variant="subtitle1" gutterBottom fontWeight={600} sx={{ mt: 3 }}>
              Biometric Verification History
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Match Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{new Date(verification?.date).toLocaleDateString()}</TableCell>
                    <TableCell>Initial Verification</TableCell>
                    <TableCell>
                      <Chip 
                        label="Pass" 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{verification?.faceMatchScore ? `${Math.round(verification.faceMatchScore)}%` : 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<DownloadIcon />}
        >
          Download Full Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVerification, setSelectedVerification] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle menu open
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, verification: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedVerification(verification);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle view details
  const handleViewDetails = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Handle new verification
  const handleNewVerification = () => {
    navigate('/verification-process');
  };

  // Simulating data loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Verification Dashboard
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNewVerification}
              startIcon={<PersonIcon />}
            >
              New Verification
            </Button>
          </Box>

          {/* Key Metrics Cards */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: '1 1 20%', minWidth: '220px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Total Verifications
                  </Typography>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
                    <VerifiedUserIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {statisticsData.totalVerifications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span style={{ color: theme.palette.success.main, fontWeight: 500 }}>
                    <ArrowUpIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                    12%
                  </span>{' '}
                  increase from last month
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: '1 1 20%', minWidth: '220px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Completed
                  </Typography>
                  <Avatar sx={{ bgcolor: 'success.light', width: 40, height: 40 }}>
                    <CheckIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {statisticsData.completedVerifications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((statisticsData.completedVerifications / statisticsData.totalVerifications) * 100)}% completion rate
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: '1 1 20%', minWidth: '220px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Pending
                  </Typography>
                  <Avatar sx={{ bgcolor: 'warning.light', width: 40, height: 40 }}>
                    <PendingIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {statisticsData.pendingVerifications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((statisticsData.pendingVerifications / statisticsData.totalVerifications) * 100)}% await verification
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: '1 1 20%', minWidth: '220px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Rejected
                  </Typography>
                  <Avatar sx={{ bgcolor: 'error.light', width: 40, height: 40 }}>
                    <CloseIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {statisticsData.rejectedVerifications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((statisticsData.rejectedVerifications / statisticsData.totalVerifications) * 100)}% rejection rate
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Tabs for different dashboard views */}
          <Box sx={{ mb: 4 }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Overview" icon={<AssessmentIcon />} iconPosition="start" />
              <Tab label="Recent Verifications" icon={<VerifiedUserIcon />} iconPosition="start" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {/* Chart: Verification Status */}
                  <Paper sx={{ p: 3, borderRadius: 2, flex: '1 1 30%', minWidth: '300px', height: '380px' }}>
                    <Typography variant="h6" gutterBottom>Verification Status</Typography>
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} Verifications`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>

                  {/* Chart: Verification Trends */}
                  <Paper sx={{ p: 3, borderRadius: 2, flex: '1 1 60%', minWidth: '500px', height: '380px' }}>
                    <Typography variant="h6" gutterBottom>Verification Trends (2023)</Typography>
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={verificationTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" stackId="a" name="Completed" fill="#4caf50" />
                          <Bar dataKey="pending" stackId="a" name="Pending" fill="#ff9800" />
                          <Bar dataKey="rejected" stackId="a" name="Rejected" fill="#f44336" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                  {/* Performance Metrics */}
                  <Paper sx={{ p: 3, borderRadius: 2, flex: '1 1 45%', minWidth: '350px' }}>
                    <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Verification Success Rate</Typography>
                          <Typography variant="body2" fontWeight={600}>{statisticsData.verificationRate}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={statisticsData.verificationRate} 
                          sx={{ height: 8, borderRadius: 5 }}
                        />
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Average Completion Time</Typography>
                          <Typography variant="body2" fontWeight={600}>{statisticsData.averageCompletionTime} minutes</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(statisticsData.averageCompletionTime / 10) * 100} 
                          sx={{ height: 8, borderRadius: 5 }}
                        />
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Document Rejection Rate</Typography>
                          <Typography variant="body2" fontWeight={600}>{statisticsData.documentRejectionRate}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={statisticsData.documentRejectionRate} 
                          color="error"
                          sx={{ height: 8, borderRadius: 5 }}
                        />
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Document Types */}
                  <Paper sx={{ p: 3, borderRadius: 2, flex: '1 1 45%', minWidth: '350px' }}>
                    <Typography variant="h6" gutterBottom>Document Types</Typography>
                    <Box sx={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={documentTypeData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#3f51b5" />
                            <Cell fill="#673ab7" />
                            <Cell fill="#9c27b0" />
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} Verifications`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            )}

            {tabValue === 1 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Recent Verifications</Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Document Type</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Face Match</TableCell>
                        <TableCell>Risk</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentVerifications.map((verification) => (
                        <TableRow key={verification.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src={verification.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
                              <Box>
                                <Typography variant="body2" fontWeight={500}>{verification.user}</Typography>
                                <Typography variant="caption" color="text.secondary">{verification.email}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>{verification.id}</Typography>
                          </TableCell>
                          <TableCell>{verification.documentType}</TableCell>
                          <TableCell>{new Date(verification.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip 
                              label={verification.status === 'completed' ? 'Verified' : verification.status === 'pending' ? 'Pending' : 'Rejected'} 
                              color={getStatusColor(verification.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {verification.faceMatchScore ? (
                              <Typography 
                                variant="body2" 
                                color={verification.faceMatchScore > 80 ? 'success.main' : verification.faceMatchScore > 60 ? 'warning.main' : 'error.main'}
                                fontWeight={500}
                              >
                                {verification.faceMatchScore}%
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="text.secondary">N/A</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {verification.riskLevel ? (
                              <Chip 
                                label={verification.riskLevel.charAt(0).toUpperCase() + verification.riskLevel.slice(1)} 
                                color={verification.riskLevel === 'low' ? 'success' : verification.riskLevel === 'medium' ? 'warning' : 'error'}
                                size="small"
                                variant="outlined"
                              />
                            ) : (
                              <Typography variant="body2" color="text.secondary">N/A</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" onClick={(e) => handleMenuClick(e, verification)}>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </Box>
        </>
      )}

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>
          <ViewIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
          Download Report
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <PdfIcon fontSize="small" sx={{ mr: 1 }} />
          Download KYC Documents
        </MenuItem>
      </Menu>

      {/* Verification Details Dialog */}
      <VerificationDetailsDialog
        open={openDialog}
        handleClose={handleDialogClose}
        verification={selectedVerification}
      />
    </Box>
  );
};

export default Dashboard;