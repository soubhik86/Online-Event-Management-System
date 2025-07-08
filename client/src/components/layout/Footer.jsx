import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
} from '@mui/icons-material';

import logo1 from '../../assets/logo-1.png';
import logo2 from '../../assets/logo-2.png';
import logo3 from '../../assets/logo-3.png';
import logo4 from '../../assets/logo-4.png';
import logo5 from '../../assets/logo-5.png';
import logo6 from '../../assets/logo-6.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0d0d1f',
        color: '#d4d4d4',
        pt: 10,
        pb: 8,
        mt: 10,
        width: '100vw',
      }}
    >
      {/* Sponsor Logos (full-width strip) */}
      <Container maxWidth={false} disableGutters>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{
            px: { xs: 4, sm: 10, md: 20 },
            mb: 4,
          }}
        >
          {[logo1, logo2, logo3, logo4, logo5, logo6].map((logo, index) => (
            <Grid item xs={6} sm={4} md={2} key={index} sx={{ textAlign: 'center' }}>
              <img
                src={logo}
                alt={`sponsor-${index}`}
                style={{
                  maxWidth: '100px',
                  opacity: 0.6,
                  filter: 'grayscale(100%)',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Divider */}
      <Divider sx={{ borderColor: '#222', mb: 4 }} />

      {/* Footer Content */}
      <Container maxWidth="md">
        {/* Logo/Brand */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            component="span"
            variant="h4"
            sx={{ fontWeight: 'bold', color: '#fff' }}
          >
            QRio
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 5, mb: 4 }}>
          {['Home', 'Management', 'Schedule', 'Event', 'Contact'].map((link) => (
            <Link
              key={link}
              href="#"
              underline="hover"
              sx={{
                color: '#cfd8dc',
                fontSize: '1.15rem',
                fontWeight: 500,
                '&:hover': { color: '#ffffff' },
              }}
            >
              {link}
            </Link>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: '1rem', mb: 3, color: '#aaa' }}
        >
          Copyright ©2025 All rights reserved
          <span style={{ color: '#e53935' }}>❤️</span> by{' '}
          <Link
            href="https://soubhikportfolio.netlify.app/"
            target="_blank"
            underline="hover"
            sx={{ color: '#90caf9' }}
          >
            Soubhik
          </Link>
        </Typography>

        {/* Social Icons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
          {[Facebook, Twitter, LinkedIn, Instagram, YouTube].map((Icon, i) => (
            <IconButton
              key={i}
              sx={{
                color: '#cfd8dc',
                border: '1px solid #333',
                borderRadius: '50%',
                p: 1.2,
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
