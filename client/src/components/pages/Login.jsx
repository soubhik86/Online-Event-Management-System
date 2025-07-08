import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Slide,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Poster from '../../assets/Poster1.jpg';
import { useUserLoginMutation } from '../../hooks/react-query/UserQuery';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useUserLoginMutation({
    onSuccess: () => {
      setIsLoading(false);
      // ✅ Optionally navigate or toast here
    },
    onError: () => {
      setIsLoading(false);
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate(data);
  };

  const inputStyles = {
    '& label': { color: '#f3f4f6' },
    '& label.Mui-focused': { color: '#facc15' },
    '& .MuiInputBase-root': { color: '#f9fafb' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#e5e7eb' },
      '&:hover fieldset': { borderColor: '#facc15' },
      '&.Mui-focused fieldset': {
        borderColor: '#facc15',
        boxShadow: '0 0 6px #facc15',
      },
    },
    input: { color: '#f3f4f6' }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${Poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(4px)',
          zIndex: 1,
        }}
      />

      {/* Animated Login Box */}
      <Slide in={true} direction="up" timeout={500}>
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              px: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                px: 4,
                py: 4,
                width: { xs: '100%', sm: 480 },
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  color: '#f50057',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                QRio
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 1, color: '#f9fafb' }}
              >
                Log In to Your Account
              </Typography>

              <Typography variant="body2" sx={{ mb: 2, color: '#d1d5db' }}>
                Use your email and password
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={inputStyles}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={inputStyles}
                  />
                </Box>

                <Box textAlign="right" mt={1} sx={{ fontSize: 13 }}>
                  <Link to="/forgetpassword" style={{ textDecoration: 'none', color: '#facc15' }}>
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(45deg, #ff6ec4, #f50057)',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    py: 1,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 20px rgba(245, 0, 87, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057, #ff6ec4)',
                    },
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: '#fff' }} />
                      Logging in...
                    </Box>
                  ) : (
                    'Log In'
                  )}
                </Button>
              </form>

              <Divider sx={{ my: 2, bgcolor: '#444' }} />

              <Typography variant="body2" sx={{ color: '#f3f4f6' }}>
                Don’t have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    textDecoration: 'none',
                    color: '#facc15',
                    fontWeight: 'bold',
                  }}
                >
                  Register
                </Link>
              </Typography>
            </Paper>
          </Box>
        </Fade>
      </Slide>
    </Box>
  );
};

export default Login;
