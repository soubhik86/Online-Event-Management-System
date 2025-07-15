// src/components/About/About.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import image from '../../assets/image.jpg';
import Management from './Management';


const About = ({ hideStory = false }) => {
  return (
    <Box sx={{ bgcolor: '#fff', pt: 12, pb: 10, fontFamily: "'Inter', 'Roboto', sans-serif" }}>
      <Container maxWidth="md">
        {/* Title & Breadcrumb */}
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.4rem', md: '3rem' },
            mb: 2,
            color: '#212121',
            letterSpacing: 1,
          }}
        >
          About Us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">About</Typography>
          </Breadcrumbs>
        </Box>

        {/* Section 1: Text */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#1a1a1a', fontSize: '1.6rem' }}
        >
          Who We Are
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}
        >
          We are a leading event management company committed to transforming ideas into unforgettable
          experiences. Whether it's a tech conference, a corporate seminar, a music festival, or a
          product launch — we bring your vision to life with precision, passion, and professionalism.
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}
        >
          Our dedicated team of planners, designers, and coordinators work collaboratively to ensure
          every aspect of your event is flawlessly executed — from venue selection and stage setup
          to attendee engagement and post-event analysis.
        </Typography>

        {/* Section 2: Image + Conference */}
        <Grid container spacing={4} alignItems="center" sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
            <img
              src={image}
              alt="Conference"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ color: '#1a1a1a', fontSize: '1.6rem' }}
            >
              Trusted by Thousands of Attendees
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}
            >
              Over the years, we’ve managed hundreds of successful events across various industries,
              earning trust for our creativity and reliability. From intimate networking events to
              large-scale international summits, we handle it all.
            </Typography>
            <List dense>
              {[
                'Corporate & Tech Conferences',
                'Product Launch Events',
                'Hybrid & Virtual Meetups',
                'Award Nights and Ceremonies',
              ].map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ fontSize: '1rem', fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* ✅ Speaker Section */}
        <Management/>

        {/* Section 3: Our Story Timeline (conditionally rendered) */}
        {!hideStory && (
          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ textAlign: 'center', mb: 6, color: '#212121', fontSize: '2.2rem' }}
            >
              Our Journey
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  year: '2012',
                  title: 'Humble Beginnings',
                  desc: 'Started as a small local event agency organizing workshops and college fests.',
                },
                {
                  year: '2015',
                  title: 'Corporate Expansion',
                  desc: 'Entered the corporate world managing product launches and B2B summits.',
                },
                {
                  year: '2018',
                  title: 'National Recognition',
                  desc: 'Recognized as one of the top event firms for innovation and attendee satisfaction.',
                },
                {
                  year: '2023',
                  title: 'Digital Shift',
                  desc: 'Expanded into hybrid and virtual events post-COVID, serving global clients seamlessly.',
                },
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: 700, color: '#ff4c4c', mb: 1, fontSize: '1.8rem' }}
                    >
                      {item.year}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ color: '#212121', mb: 1, fontSize: '1.2rem' }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#616161', fontSize: '1.05rem', lineHeight: 1.7 }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default About;
