import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useGetAllEventQuery } from '../../../hooks/react-query/EventQuery';

const TimeCell = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: '1rem',
  color: '#00ffff',
  padding: '1rem',
  textAlign: 'center',
  borderBottom: '1px solid #1e293b',
  backgroundColor: '#0d0d0d',
  fontFamily: 'Poppins, sans-serif',
}));

const SessionCell = styled(Box)(({ highlight }) => ({
  padding: '1rem',
  textAlign: 'center',
  background: highlight ? '#00ffff' : '#1e1e1e',
  color: highlight ? '#000' : '#f1f5f9',
  fontWeight: 500,
  border: '1px solid #334155',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: 4,
  boxShadow: highlight ? '0 0 15px #00ffff' : 'none',
  transition: '0.3s ease',
}));

const SpeakerText = styled(Typography)(() => ({
  fontSize: '0.875rem',
  color: '#94a3b8',
  fontWeight: 400,
  fontFamily: 'Poppins, sans-serif',
  marginTop: '0.25rem',
}));

const SchedulePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllEventQuery();
  const events = data?.data?.events || [];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [grouped, setGrouped] = useState({});

  const normalizeTime = (t) => {
    if (!t) return '';
    if (t.includes('.')) return t.replace('.', ':');
    return t;
  };

  useEffect(() => {
    if (events.length) {
      const byCategory = {};

      events.forEach((event) => {
        const { category, date, time, title, organizer } = event;
        const day = new Date(date).toDateString();
        const formattedTime = normalizeTime(time);

        if (!byCategory[category]) byCategory[category] = {};
        if (!byCategory[category][day]) byCategory[category][day] = [];

        byCategory[category][day].push({
          time: formattedTime,
          title,
          speaker: organizer?.name,
        });
      });

      setGrouped(byCategory);
    }
  }, [events]);

  const categories = Object.keys(grouped);

  const allDaySessions = {};
  categories.forEach((cat) => {
    const catDays = grouped[cat];
    Object.entries(catDays).forEach(([day, sessions]) => {
      if (!allDaySessions[day]) allDaySessions[day] = [];
      allDaySessions[day] = [...allDaySessions[day], ...sessions];
    });
  });

  const daySessions =
    selectedCategory === 'all' ? allDaySessions : grouped[selectedCategory] || {};

  const allTimes = Array.from(
    new Set(Object.values(daySessions).flat().map((s) => s.time))
  ).sort();

  if (isLoading) {
    return (
      <Box sx={{ mt: 12, textAlign: 'center' }}>
        <CircularProgress color="info" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" mt={12} textAlign="center">
        Failed to load schedule.
      </Typography>
    );
  }

  if (!categories.length) {
    return (
      <Typography mt={12} textAlign="center">
        No events available in the schedule.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 14, px: 2, pb: 6, backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight={700}
        textAlign="center"
        fontFamily="Playfair Display, serif"
        mb={1}
        sx={{
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <span role="img" aria-label="calendar">🗓️</span> Event Schedule
      </Typography>

      {/* Breadcrumb */}
      <Typography
        textAlign="center"
        color="#94a3b8"
        mb={4}
        fontFamily="Poppins"
        fontSize="1rem"
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        Home &gt; Our Schedule
      </Typography>

      {/* Category Buttons */}
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={2} mb={4}>
        <Button
          variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
          onClick={() => setSelectedCategory('all')}
          sx={{
            textTransform: 'capitalize',
            fontFamily: 'Poppins',
            fontWeight: 500,
            borderRadius: 2,
            backgroundColor: selectedCategory === 'all' ? '#00ffff' : 'transparent',
            color: selectedCategory === 'all' ? '#000' : '#00ffff',
            border: '1px solid #00ffff',
            '&:hover': {
              backgroundColor: '#00ffff',
              color: '#000',
            },
          }}
        >
          All
        </Button>

        {categories.map((cat, i) => (
          <Button
            key={i}
            variant={selectedCategory === cat ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              textTransform: 'capitalize',
              fontFamily: 'Poppins',
              fontWeight: 500,
              borderRadius: 2,
              backgroundColor: selectedCategory === cat ? '#00ffff' : 'transparent',
              color: selectedCategory === cat ? '#000' : '#00ffff',
              border: '1px solid #00ffff',
              '&:hover': {
                backgroundColor: '#00ffff',
                color: '#000',
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Stack>

      {/* Schedule Grid */}
      <Box sx={{ overflowX: 'auto' }}>
        <Paper
          elevation={2}
          sx={{
            minWidth: '1200px',
            borderRadius: 3,
            border: '1px solid #1e293b',
            p: 2,
            backgroundColor: '#1a1a1a',
          }}
        >
          <Grid container>
            <Grid item xs={2} />
            {Object.keys(daySessions)
              .sort((a, b) => new Date(a) - new Date(b))
              .map((day, idx) => (
                <Grid item xs key={idx} minWidth={140}>
                  <Box p={2} textAlign="center">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      fontFamily="Poppins"
                      color="#00ffff"
                    >
                      Day {idx + 1}
                    </Typography>
                    <Typography fontSize="0.875rem" color="#94a3b8" fontFamily="Poppins">
                      {day}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>

          {allTimes.map((time) => (
            <Grid container key={time}>
              <Grid item xs={2}>
                <TimeCell>{time}</TimeCell>
              </Grid>
              {Object.keys(daySessions)
                .sort((a, b) => new Date(a) - new Date(b))
                .map((day, idx) => {
                  const session = daySessions[day].find((s) => s.time === time);
                  return (
                    <Grid item xs key={idx} minWidth={140}>
                      <SessionCell
                        highlight={session?.title?.toLowerCase().includes('final')}
                      >
                        {session && (
                          <>
                            {session.title}
                            {session.speaker && (
                              <SpeakerText>by {session.speaker}</SpeakerText>
                            )}
                          </>
                        )}
                      </SessionCell>
                    </Grid>
                  );
                })}
            </Grid>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default SchedulePage;
