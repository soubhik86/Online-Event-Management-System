import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { useNavigate } from 'react-router-dom';

import poster from '../../assets/Poster.jpg';
import { useGetAllEventQuery } from '../../hooks/react-query/EventQuery';
import { baseURL } from '../../Api/endPoints/endPoint';

import Countdown from './Countdown';
import About from './About';
import Contact from './Contact';
import LatestNews from './Events/LatestNews';
import Newsletter from './Events/Newsletter';
import Blog from './Blog';


const placeholder = 'https://via.placeholder.com/400x200?text=No+Image+Available';

const fadeContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const HeroBackground = () => {
  const navigate = useNavigate();
  const { data, isLoading: eventsLoading, isError } = useGetAllEventQuery();
  const events = data?.data?.events.slice(0, 3) || [];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: '#a259ff' }} />
      </Box>
    );
  }

  return (
    <motion.div
      variants={fadeContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <Parallax bgImage={poster} strength={300}>
        <Box
          sx={{
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(2px)',
              zIndex: 1,
            }}
          />
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 2,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              padding: '0 16px',
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>
              "World's fastest-growing tech conference" – Inc.
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Freelancer Conference, 2025
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, fontSize: '1.1rem' }}>
              Vanowen St, Canoga Park, California, USA
              <br />
              25th - 27th April, 2025
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#f50057',
                color: '#fff',
                fontWeight: 'bold',
                padding: '10px 25px',
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#c51162' },
              }}
              onClick={() => navigate('/eventlist')}
            >
              GET YOUR PASS NOW !
            </Button>
          </motion.div>
        </Box>
      </Parallax>

      {/* Countdown */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Countdown />
      </motion.div>

      {/* About Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <About />
      </motion.div>

      {/* Featured Events */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box sx={{ px: 0, py: 6, backgroundColor: '#f8f9fa', width: '100%' }}>
          <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                textAlign="center"
                mb={4}
                fontFamily="Montserrat"
              >
                Featured Events
              </Typography>
            </motion.div>

            {eventsLoading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Typography color="error" align="center">
                Failed to load events.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {events.map((evt, idx) => {
                  const imgUrl = evt.bannerImage
                    ? `${baseURL}/uploads/${evt.bannerImage}`
                    : placeholder;
                  const cardAnim = idx % 2 === 0 ? fadeInLeft : fadeInRight;
                  return (
                    <Grid key={evt._id} item xs={12} sm={6} md={4}>
                      <motion.div variants={cardAnim}>
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Card sx={{ borderRadius: 3, height: '100%' }}>
                            <CardMedia
                              component="img"
                              height="180"
                              image={imgUrl}
                              alt={evt.title}
                              sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                              <Typography variant="h6" fontWeight="bold" color="primary">
                                {evt.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(evt.date).toLocaleDateString()} | {evt.location}
                              </Typography>
                              <Typography variant="body2" mt={1}>
                                Price: ₹{evt.ticketPrice}
                              </Typography>
                            </CardContent>
                            <CardActions sx={{ px: 2, pb: 2 }}>
                              <Button
                                size="small"
                                fullWidth
                                onClick={() => navigate(`/eventbyid/${evt._id}`)}
                                variant="outlined"
                                color="primary"
                                sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                              >
                                View Details
                              </Button>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/* View All Events Button */}
            <motion.div variants={fadeInUp}>
              <Box textAlign="center" mt={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/eventlist')}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    px: 4,
                    py: 1,
                  }}
                >
                  View All Events
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* ✅ Blog Section added here */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Blog />
      </motion.div>

      {/* Latest News */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <LatestNews />
      </motion.div>

      {/* Newsletter Section */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Newsletter />
      </motion.div>

      {/* Contact */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Contact />
      </motion.div>
    </motion.div>
  );
};

export default HeroBackground;
