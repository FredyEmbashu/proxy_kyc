import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Divider,
  Stack
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error,
  Info,
  Assignment,
  Face,
  Fingerprint,
  Public
} from '@mui/icons-material';
import { RiskScore } from '../../services/RiskScoringService';

interface RiskScoreDisplayProps {
  score: RiskScore;
  loading?: boolean;
}

const RiskScoreDisplay: React.FC<RiskScoreDisplayProps> = ({ score, loading = false }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'success.main';
      case 'medium':
        return 'warning.main';
      case 'high':
        return 'error.main';
      default:
        return 'info.main';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <CheckCircle color="success" />;
      case 'medium':
        return <Warning color="warning" />;
      case 'high':
        return <Error color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
          Risk Assessment Results
        </Typography>
        <Chip
          icon={getRiskLevelIcon(score.riskLevel)}
          label={`${score.riskLevel.toUpperCase()} RISK`}
          color={score.riskLevel === 'low' ? 'success' : score.riskLevel === 'medium' ? 'warning' : 'error'}
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={score.overallScore}
            size={120}
            thickness={5}
            sx={{
              color: score.overallScore >= 75 ? 'success.main' : score.overallScore >= 50 ? 'warning.main' : 'error.main',
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
            <Typography variant="h4" component="div" color="text.secondary">
              {Math.round(score.overallScore)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Component Scores
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Assignment color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Document Score
            </Typography>
            <Typography variant="h6">
              {score.componentScores.documentScore}/25
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Face color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Biometric Score
            </Typography>
            <Typography variant="h6">
              {score.componentScores.biometricScore}/25
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Fingerprint color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Behavioral Score
            </Typography>
            <Typography variant="h6">
              {score.componentScores.behavioralScore}/25
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Public color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              External Verification
            </Typography>
            <Typography variant="h6">
              {score.componentScores.externalVerificationScore}/25
            </Typography>
          </Paper>
        </Box>
      </Stack>

      {score.flags.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Risk Flags
          </Typography>
          <List dense>
            {score.flags.map((flag, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Warning color="warning" />
                </ListItemIcon>
                <ListItemText primary={flag} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {score.recommendations.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <List dense>
            {score.recommendations.map((recommendation, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Info color="info" />
                </ListItemIcon>
                <ListItemText primary={recommendation} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default RiskScoreDisplay;