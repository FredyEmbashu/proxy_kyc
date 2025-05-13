import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  loading?: boolean;
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  features,
  buttonText,
  onButtonClick,
  loading = false,
  highlighted = false
}) => {
  return (
    <Card
      elevation={highlighted ? 8 : 2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        border: highlighted ? '2px solid primary.main' : 'none',
      }}
    >
      {highlighted && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'primary.main',
            color: 'white',
            px: 2,
            py: 0.5,
            borderBottomLeftRadius: 8,
          }}
        >
          <Typography variant="subtitle2">Popular</Typography>
        </Box>
      )}
      
      <CardHeader
        title={title}
        titleTypographyProps={{ align: 'center', variant: 'h5' }}
        sx={{
          backgroundColor: highlighted ? 'primary.light' : 'grey.100',
          pb: 1,
        }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h3" component="span">
            {price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {period}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <List dense>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant={highlighted ? 'contained' : 'outlined'}
          color="primary"
          onClick={onButtonClick}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PricingCard;