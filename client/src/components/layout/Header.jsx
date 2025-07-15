import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  Avatar,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { profilePic } from '../../Api/endPoints/endPoint';

// Styled Components
const NavButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 600,
  fontFamily: 'Montserrat, sans-serif',
  textTransform: 'uppercase',
  fontSize: '0.95rem',
  letterSpacing: '1px',
  margin: '0 12px',
  position: 'relative',
  '&:hover': {
    color: theme.palette.primary.main,
    '&::after': {
      width: '100%',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: 0,
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
}));

const QRioTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 800,
  fontSize: '2rem',
  color: '#ffffff',
  letterSpacing: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: theme.palette.primary.main,
    '& svg': {
      transform: 'rotate(-10deg) scale(1.1)',
      color: theme.palette.primary.main,
    }
  },
  '& svg': {
    marginRight: 10,
    fontSize: '2rem',
    transition: 'all 0.3s ease',
    color: theme.palette.secondary.main,
  }
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 16,
    minWidth: 260,
    background: `linear-gradient(135deg, rgba(30,30,30,0.95), rgba(60,60,60,0.95))`,
    color: '#f3f4f6',
    backdropFilter: 'blur(20px)',
    boxShadow: '0px 12px 32px rgba(0,0,0,0.4)',
    padding: theme.spacing(1, 0),
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.95rem',
  padding: theme.spacing(1.5, 3),
  transition: 'all 0.2s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1)',
    }
  },
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: theme.palette.primary.main,
    transition: 'all 0.2s ease',
  },
  '&:not(:last-child)': {
    marginBottom: 4,
  },
}));

const ProfileBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const user = localStorage.getItem('name');
  const proImg = localStorage.getItem('proimg');
  const token = localStorage.getItem('token');

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgba(17, 17, 17, 0.6)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        borderBottom: `1px solid ${alpha('#ffffff', 0.1)}`,
        py: 1,
        zIndex: 1300,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(17, 17, 17, 0.8)',
          borderBottom: `1px solid ${alpha('#ffffff', 0.2)}`,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, md: 4 } }}>
        <QRioTitle onClick={() => navigate('/')}>
          <EventNoteIcon sx={{ fontSize: '2.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          QRio
        </QRioTitle>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <NavButton onClick={() => navigate('/')}>Home</NavButton>
          <NavButton onClick={() => navigate('/about')}>About</NavButton>
          <NavButton onClick={() => navigate('/eventlist')}>Events</NavButton>
          <NavButton onClick={() => navigate('/schedule')}>Schedule</NavButton>
          <NavButton onClick={() => navigate('/blogs')}>Blog</NavButton>
          <NavButton onClick={() => navigate('/contact')}>Contact</NavButton>
        </Box>

        {/* Profile Dropdown */}
        {token ? (
          <Box sx={{ ml: 2 }}>
            <ProfileBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  src={proImg ? profilePic(proImg) : '/error.png'}
                  alt="profile"
                  sx={{
                    width: 44,
                    height: 44,
                    border: `2px solid ${alpha('#ffffff', 0.3)}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      border: `2px solid ${alpha('#ffffff', 0.8)}`,
                      boxShadow: `0 6px 16px ${alpha('#ffffff', 0.2)}`,
                    }
                  }}
                />
              </IconButton>
            </ProfileBadge>
            <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <StyledMenuItem disabled>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {user || 'Guest'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Active now
                  </Typography>
                </Box>
              </StyledMenuItem>

              <Divider sx={{ my: 1, mx: 3, opacity: 0.5 }} />

              <StyledMenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/myregistrations');
                }}
              >
                <ListItemIcon>
                  <EventAvailableIcon fontSize="small" />
                </ListItemIcon>
                My Events
              </StyledMenuItem>

              <StyledMenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/profile');
                }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Update Profile
              </StyledMenuItem>

              <StyledMenuItem
                onClick={() => {
                  localStorage.clear();
                  handleMenuClose();
                  navigate('/login');
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign Out
              </StyledMenuItem>
            </StyledMenu>
          </Box>
        ) : (
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              px: 3,
              py: 1,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                backgroundColor: 'white',
                color: 'primary.main',
                boxShadow: '0 6px 16px rgba(255,255,255,0.3)',
                '&::before': {
                  transform: 'translateX(0)',
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.2)}, transparent)`,
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
              },
            }}
            onClick={() => navigate('/register')}
          >
            Register Now
          </Button>
        )}

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.1),
              }
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
