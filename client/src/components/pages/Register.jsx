import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Slide,
  Fade,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Poster from '../../assets/Poster1.jpg';
import { useUserSignUpMutation } from '../../hooks/react-query/UserQuery';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useUserSignUpMutation({
    onSuccess: () => {
      setIsLoading(false);
      setShowSnackbar(true);
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleImage = (e) => setImg(e.target.files[0]);

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    if (img) formData.append('profilePicture', img);
    mutate(formData);
  };

  useEffect(() => {
    setTimeout(() => setShowForm(true), 400);
  }, []);

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
    input: { color: '#f3f4f6' },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        mt: '64px',
        backgroundImage: `url(${Poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
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

      {/* Centered Form */}
      <Slide in={showForm} direction="up" timeout={500}>
        <Fade in={showForm} timeout={800}>
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
                py: 3.5,
                borderRadius: 4,
                width: { xs: '100%', sm: 600 },
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
                sx={{ mb: 0.5, color: '#f9fafb' }}
              >
                Create Your Account
              </Typography>

              <Typography variant="body2" sx={{ mb: 2, color: '#d1d5db' }}>
                Use your email to register
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    label="Full Name"
                    {...register('name', { required: true })}
                    error={!!errors.name}
                    helperText={errors.name && 'Name is required'}
                    variant="outlined"
                    margin="dense"
                    sx={{ ...inputStyles, flexBasis: '48%' }}
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    {...register('email', { required: true })}
                    error={!!errors.email}
                    helperText={errors.email && 'Email is required'}
                    variant="outlined"
                    margin="dense"
                    sx={{ ...inputStyles, flexBasis: '48%' }}
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    {...register('phone', { required: true })}
                    error={!!errors.phone}
                    helperText={errors.phone && 'Phone is required'}
                    variant="outlined"
                    margin="dense"
                    sx={{ ...inputStyles, flexBasis: '48%' }}
                  />
                  <TextField
                    label="Profile Picture"
                    value={img ? img.name : ''}
                    variant="outlined"
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Button
                          component="label"
                          sx={{ color: '#facc15', textTransform: 'none' }}
                        >
                          Browse
                          <input type="file" hidden onChange={handleImage} />
                        </Button>
                      ),
                    }}
                    sx={{ ...inputStyles, flexBasis: '48%' }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    {...register('password', { required: true })}
                    error={!!errors.password}
                    helperText={errors.password && 'Password is required'}
                    variant="outlined"
                    margin="dense"
                    sx={{ ...inputStyles, flexBasis: '100%', mt: 1 }}
                  />
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
                      Please wait...
                    </Box>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>

              <Divider sx={{ my: 2, bgcolor: '#fff', opacity: 0.3 }} />

              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: '#facc15',
                    fontWeight: 'bold',
                  }}
                >
                  Log In
                </Link>
              </Typography>
            </Paper>
          </Box>
        </Fade>
      </Slide>

      {/* Snackbar Toast */}
      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" variant="filled" sx={{ fontWeight: 'bold' }}>
          🎉 Registration successful! Redirecting to verification...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
