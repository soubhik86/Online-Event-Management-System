import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubscribe = () => {
    if (!email.trim()) return alert('Please enter your email!');
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <Box
      sx={{
        mt: 8,
        mb: 6,
        px: { xs: 2, sm: 4 },
        py: { xs: 6, sm: 8 },
        borderRadius: 1,
        background: 'linear-gradient(to right, #f76b1c, #ff4081)',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          maxWidth: '1100px',
          mx: 'auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {/* Left Side Text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: isMobile ? '1.3rem' : '1.75rem',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Subscribe Newsletter
          </Typography>
          <Typography sx={{ mt: 1, fontSize: '1rem', opacity: 0.95 }}>
            Subscribe to our newsletter and don’t miss anything
          </Typography>
        </Box>

        {/* Right Side Form */}
        <Box
          sx={{
            flex: 1.2,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Your email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              bgcolor: '#fff',
              borderRadius: 999,
              input: {
                px: 2.5,
                py: 1.5,
                fontSize: '1rem',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
          <Button
            onClick={handleSubscribe}
            sx={{
              bgcolor: '#fff',
              color: '#f76b1c',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: 999,
              px: 4,
              py: 1.5,
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: '#f1f1f1',
              },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
