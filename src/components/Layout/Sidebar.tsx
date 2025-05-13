import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Description as DocumentIcon,
  Face as FaceIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  activeIndex: number;
}

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/Dashboard'
  },
  {
    text: 'Personal Info',
    icon: <PersonIcon />,
    path: '/personal-info'
  },
  {
    text: 'Documents',
    icon: <DocumentIcon />,
    path: '/documents'
  },
  {
    text: 'Face Verification',
    icon: <FaceIcon />,
    path: '/face-verification'
  }
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onNavigate, activeIndex }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
    >
      <List sx={{ width: '100%', pt: 2 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onNavigate(index)}
                selected={index === activeIndex}
              >
                <ListItemIcon
                  sx={{
                    color: index === activeIndex ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            {index < menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;