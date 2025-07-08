import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Slide,
  Fade,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '../../hooks/react-query/UserQuery';
import Poster from '../../assets/Poster1.jpg';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useResetPasswordMutation({
    onSuccess: () => {
      setIsLoading(false);
      setShowSnackbar(true);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate(data);
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
                py: 4,
                borderRadius: 4,
                width: { xs: '100%', sm: 480 },
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
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 0.5, color: '#f9fafb' }}
              >
                Reset Your Password
              </Typography>

              <Typography variant="body2" sx={{ mb: 2, color: '#d1d5db' }}>
                Enter OTP and your new password
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="OTP"
                  fullWidth
                  {...register('otp', { required: 'OTP is required' })}
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  variant="outlined"
                  margin="dense"
                  sx={{ ...inputStyles }}
                />

                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Minimum 6 characters',
                    },
                  })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  variant="outlined"
                  margin="dense"
                  sx={{ ...inputStyles }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    py: 1,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 20px rgba(0, 114, 255, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0072ff, #00c6ff)',
                    },
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: '#fff' }} />
                      Resetting...
                    </Box>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </Paper>
          </Box>
        </Fade>
      </Slide>

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2500}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ fontWeight: 'bold' }}>
          ✅ Password reset successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetPassword;
