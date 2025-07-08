import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import { useGetAllEventQuery } from '../../../hooks/react-query/EventQuery';
import { baseURL } from '../../../Api/endPoints/endPoint';

const placeholder = 'https://via.placeholder.com/600x400?text=No+Image';

const NewsCard = ({ event, large }) => {
  const image = event.bannerImage
    ? `${baseURL}/uploads/${event.bannerImage}`
    : placeholder;

  const height = large ? 360 : 180;

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        height,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 4,
        },
      }}
    >
      <img
        src={image}
        alt={event.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))',
        }}
      />

      {/* Category Badge */}
      <Chip
        label={event.category || 'General'}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          bgcolor: '#ff4081',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          color: '#fff',
        }}
      >
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', mb: 0.5 }}
        >
          <span style={{ marginRight: 6 }}>🕒</span>
          {new Date(event.date).toLocaleDateString()}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 0.5 }}
        >
          {event.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.9rem',
            color: '#ddd',
          }}
        >
          {event.description || 'Exciting event happening soon! Don’t miss out.'}
        </Typography>
      </Box>
    </Box>
  );
};

const LatestNews = () => {
  const { data, isLoading, isError } = useGetAllEventQuery();

  const events = Array.isArray(data?.data?.events) ? data.data.events : [];

  const filteredEvents = events.filter((event) =>
    ['CodeFuture Hackathon', 'Future Sound Fest', 'BGIS 2025'].includes(event.title)
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 6, backgroundColor: '#f2f3f5' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={1}
        fontFamily="Montserrat"
      >
        Latest News
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={4}>
        Do not miss anything topic about the event
      </Typography>

      {isLoading || isError ? (
        <Typography textAlign="center">
          {isLoading ? 'Loading...' : 'Failed to fetch news.'}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {/* Left side large card */}
          <Grid item xs={12} md={6}>
            {filteredEvents[0] && <NewsCard event={filteredEvents[0]} large />}
          </Grid>

          {/* Right side two stacked small cards */}
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={4}>
              {filteredEvents.slice(1, 3).map((event) => (
                <Grid item xs={12} key={event._id}>
                  <NewsCard event={event} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LatestNews;
