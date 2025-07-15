import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Slide,
  Fade,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Poster from '../../assets/Poster1.jpg';
import { useVerifyEmailMutation } from '../../hooks/react-query/UserQuery';

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useVerifyEmailMutation({
    onSuccess: () => {
      setIsLoading(false);
      // Optional: show toast or redirect
    },
    onError: () => {
      setIsLoading(false);
    },
  });

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

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate(data); // API call
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
          bgcolor: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(4px)',
          zIndex: 1,
        }}
      />

      {/* Centered Form with Animation */}
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
                width: { xs: '100%', sm: 440 },
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
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 1, color: '#f9fafb' }}
              >
                Verify Your Email
              </Typography>

              <Typography variant="body2" sx={{ mb: 2, color: '#d1d5db' }}>
                Enter the OTP sent to your email
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="OTP"
                  variant="outlined"
                  margin="dense"
                  {...register('otp', { required: 'OTP is required' })}
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  sx={{ ...inputStyles }}
                />

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
                      Verifying...
                    </Box>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </form>
            </Paper>
          </Box>
        </Fade>
      </Slide>
    </Box>
  );
};

export default VerifyEmail;
