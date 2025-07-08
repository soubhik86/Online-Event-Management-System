import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const targetDate = new Date("2025-12-25T00:00:00").getTime();

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const total = targetDate - new Date().getTime();

    if (total <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBox = (value, label) => (
    <Paper
      elevation={4}
      sx={{
        px: 4,
        py: 2.5,
        textAlign: 'center',
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
        minWidth: 100,
        flexShrink: 0,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {String(value).padStart(2, '0')}
      </Typography>
      <Typography variant="body2">{label}</Typography>
    </Paper>
  );

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, sm: 6 },
        background: 'linear-gradient(to right, #ff512f, #dd2476)',
        color: '#fff',
      }}
    >
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="medium" sx={{ opacity: 0.9 }}>
            Conference Date
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            Count Every Second <br /> Until the Event
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wrap on small screens
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: 3,
              pb: 1,
            }}
          >
            {timeBox(timeLeft.days, 'Days')}
            {timeBox(timeLeft.hours, 'Hrs')}
            {timeBox(timeLeft.minutes, 'Mins')}
            {timeBox(timeLeft.seconds, 'Secs')}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Countdown;
