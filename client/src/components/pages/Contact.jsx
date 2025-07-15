import React from 'react';
import { Box, Typography, Grid, Link, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Contact = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        pt: { xs: 8, md: 12 },
        pb: 8,
        px: { xs: 2, sm: 4, md: 8, lg: 12 },
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        color: '#e0e0e0',
        backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(30, 30, 30, 0.8) 0%, rgba(10, 10, 10, 1) 50%)',
      }}
    >
      <Grid 
        container 
        spacing={6} 
        alignItems="center" 
        justifyContent="center"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            component={motion.div}
            variants={itemVariants}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ 
                fontFamily: 'Montserrat', 
                color: theme.palette.primary.light,
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '60%',
                  height: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                  borderRadius: 3
                }
              }}
            >
              <LocationOnIcon 
                sx={{ 
                  verticalAlign: 'middle', 
                  mr: 2, 
                  fontSize: '2rem',
                  color: theme.palette.secondary.main
                }} 
              />
              Location
            </Typography>

            <Typography
              variant="h6"
              component={motion.p}
              variants={itemVariants}
              sx={{ 
                fontFamily: 'Montserrat', 
                color: '#b0bec5',
                mb: 4,
                lineHeight: 1.6
              }}
            >
              Get directions to our event center
            </Typography>

            <Box mt={4} component={motion.div} variants={itemVariants}>
              <Box 
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(30, 30, 30, 0.6)',
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} color="#b0bec5">
                  Address:
                </Typography>
                <Typography variant="body1" mt={1} sx={{ lineHeight: 1.7 }}>
                  01 Pascale Springs Apt. 339, NY City <br />
                  United States
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3} mt={2} component={motion.div} variants={containerVariants}>
              <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
                <Box 
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    borderRadius: 2,
                    borderLeft: `4px solid ${theme.palette.secondary.main}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <PhoneIcon sx={{ color: theme.palette.secondary.main, mr: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="#b0bec5">
                      Phone:
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    (+91) 8617387835
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
                <Box 
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    borderRadius: 2,
                    borderLeft: `4px solid ${theme.palette.info.main}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <ContactMailIcon sx={{ color: theme.palette.info.main, mr: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="#b0bec5">
                      Email:
                    </Typography>
                  </Box>
                  <Link 
                    href="mailto:soubhikmahato6@gmail.com" 
                    sx={{ 
                      color: '#64b5f6', 
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    soubhikmahato6@gmail.com
                  </Link>
                </Box>
              </Grid>
            </Grid>

            <Box mt={3} component={motion.div} variants={itemVariants}>
              <Box 
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(30, 30, 30, 0.6)',
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.success.main}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <PublicIcon sx={{ color: theme.palette.success.main, mr: 1.5 }} />
                  <Typography variant="subtitle1" fontWeight={600} color="#b0bec5">
                    Website:
                  </Typography>
                </Box>
                <Link
                  href="https://soubhikportfolio.netlify.app/"
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    color: '#64b5f6', 
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Soubhik Portfolio
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Section - Map */}
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            sx={{
              position: 'relative',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, transparent 100%)`,
                zIndex: 1,
                pointerEvents: 'none'
              }
            }}
          >
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2747108811!2d-118.69193091811988!3d34.020039248284444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6343b7a1b3f%3A0x4b78f0ec9e453b97!2sEast%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1654123205530!5m2!1sen!2sin"
              sx={{
                width: '100%',
                height: { xs: 350, sm: 400, md: 500 },
                border: 0,
                filter: 'grayscale(30%) contrast(110%) brightness(0.9)',
                transition: 'filter 0.5s ease',
                '&:hover': {
                  filter: 'grayscale(0%) contrast(110%) brightness(1)'
                }
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;