// src/components/About/Speakers.jsx
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import speaker1 from '../../assets/speaker-1.jpg';
import speaker2 from '../../assets/speaker-2.jpg';
import speaker3 from '../../assets/speaker-3.jpg';
import speaker4 from '../../assets/speaker-4.jpg';
import speaker5 from '../../assets/speaker-5.jpg';

const speakers = [
  { name: 'John Doe', img: speaker1 },
  { name: 'Emily Carter', img: speaker2 },
  { name: 'Michael Lee', img: speaker3 },
  { name: 'Sophia Martinez', img: speaker4 },
  { name: 'Rachel Kim', img: speaker5 },
];

const Management = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: '#fff' }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight={800}
        sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1, color: '#212121' }}
      >
        Who’s speaking
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        sx={{ mb: 6, fontSize: '1.1rem' }}
      >
        These are our communicators, you can see each person's information
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {speakers.map((speaker, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
                '&:hover .overlay': {
                  opacity: 1,
                },
              }}
            >
              <img
                src={speaker.img}
                alt={speaker.name}
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0,0,0,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  letterSpacing: 1,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                {speaker.name}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Management;
