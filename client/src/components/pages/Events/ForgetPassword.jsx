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
import { useForgotPasswordMutation } from '../../../hooks/react-query/UserQuery';
import Poster from '../../../assets/Poster1.jpg'; // ✅ Make sure the image exists at this path

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useForgotPasswordMutation({
    onSuccess: () => {
      setIsLoading(false);
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
    mutate(data);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${Poster})`, // ✅ Enabled
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
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
                Forgot Password
              </Typography>

              <Typography variant="body2" sx={{ mb: 2, color: '#d1d5db' }}>
                Enter your email to receive an OTP
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="dense"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
                      Sending...
                    </Box>
                  ) : (
                    'Send OTP'
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

export default ForgetPassword;
