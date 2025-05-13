import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Button, Chip } from '@mui/material';
import { CheckCircle, Warning, Error, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RiskScore } from '../../services/RiskScoringService';

interface RiskScoreSummaryProps {
  compact?: boolean;
}

const RiskScoreSummary: React.FC<RiskScoreSummaryProps> = ({ compact = false }) => {
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get risk score from localStorage
    const storedScore = localStorage.getItem('riskScoreData');
    if (storedScore) {
      try {
        setRiskScore(JSON.parse(storedScore));
      } catch (err) {
        console.error('Error parsing stored risk score:', err);
      }
    }
    setLoading(false);
  }, []);

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
        return <CheckCircle fontSize="small" />;
      case 'medium':
        return <Warning fontSize="small" />;
      case 'high':
        return <Error fontSize="small" />;
      default:
        return <Info fontSize="small" />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!riskScore) {
    return (
      <Paper sx={{ p: compact ? 2 : 3, textAlign: 'center' }}>
        <Typography variant={compact ? 'body1' : 'h6'} gutterBottom>
          No Risk Assessment Available
        </Typography>
        <Button 
          variant="contained" 
          size={compact ? 'small' : 'medium'}
          onClick={() => navigate('/risk-scoring')}
        >
          Generate Risk Score
        </Button>
      </Paper>
    );
  }

  if (compact) {
    return (
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1">Risk Score</Typography>
          <Chip
            icon={getRiskLevelIcon(riskScore.riskLevel)}
            label={`${riskScore.riskLevel.toUpperCase()}`}
            color={riskScore.riskLevel === 'low' ? 'success' : riskScore.riskLevel === 'medium' ? 'warning' : 'error'}
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
            <CircularProgress
              variant="determinate"
              value={riskScore.overallScore}
              size={40}
              thickness={4}
              sx={{
                color: riskScore.overallScore >= 75 ? 'success.main' : riskScore.overallScore >= 50 ? 'warning.main' : 'error.main',
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
              <Typography variant="caption" component="div" color="text.secondary">
                {Math.round(riskScore.overallScore)}
              </Typography>
            </Box>
          </Box>
          <Button 
            size="small" 
            onClick={() => navigate('/risk-scoring')}
          >
            View Details
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Risk Assessment Summary
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mr: 3 }}>
          <CircularProgress
            variant="determinate"
            value={riskScore.overallScore}
            size={80}
            thickness={5}
            sx={{
              color: riskScore.overallScore >= 75 ? 'success.main' : riskScore.overallScore >= 50 ? 'warning.main' : 'error.main',
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
            <Typography variant="h5" component="div" color="text.secondary">
              {Math.round(riskScore.overallScore)}
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Chip
            icon={getRiskLevelIcon(riskScore.riskLevel)}
            label={`${riskScore.riskLevel.toUpperCase()} RISK`}
            color={riskScore.riskLevel === 'low' ? 'success' : riskScore.riskLevel === 'medium' ? 'warning' : 'error'}
            sx={{ mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {riskScore.flags.length > 0 ? `${riskScore.flags.length} issues detected` : 'No issues detected'}
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant="outlined" 
        fullWidth
        onClick={() => navigate('/risk-scoring')}
      >
        View Full Risk Assessment
      </Button>
    </Paper>
  );
};

export default RiskScoreSummary;