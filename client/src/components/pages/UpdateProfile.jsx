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
  Avatar,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Poster from '../../assets/Poster1.jpg';
import { useUpdateProfileMutation } from '../../hooks/react-query/UserQuery';
import { profilePic } from '../../Api/endPoints/endPoint';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const storedName = localStorage.getItem('name');
  const storedPhone = localStorage.getItem('phone');
  const storedImage = localStorage.getItem('proimg');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(profilePic(storedImage));
  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useUpdateProfileMutation({
    onSuccess: ({ data }) => {
      setIsLoading(false);
      setShowSnackbar(true);

      if (data?.updatedUser?.name) localStorage.setItem('name', data.updatedUser.name);
      if (data?.updatedUser?.phone) localStorage.setItem('phone', data.updatedUser.phone);
      if (data?.updatedUser?.profilePicture)
        localStorage.setItem('proimg', data.updatedUser.profilePicture);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.phone) formData.append('phone', data.phone);
    if (img) formData.append('profilePicture', img);
    mutate(formData);
  };

  useEffect(() => {
    setTimeout(() => setShowForm(true), 400);
    setValue('name', storedName || '');
    setValue('phone', storedPhone || '');
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

              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#f9fafb' }}>
                Update Your Profile
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
                    label="Phone Number"
                    {...register('phone', { required: true })}
                    error={!!errors.phone}
                    helperText={errors.phone && 'Phone is required'}
                    variant="outlined"
                    margin="dense"
                    sx={{ ...inputStyles, flexBasis: '48%' }}
                  />

                  <Box sx={{ flexBasis: '100%', textAlign: 'center', mt: 1 }}>
                    <Avatar
                      src={preview}
                      alt="Current"
                      sx={{
                        width: 84,
                        height: 84,
                        mx: 'auto',
                        mb: 1,
                        border: '2px solid #facc15',
                      }}
                    />
                    <TextField
                      label="Profile Picture"
                      value={img ? img.name : ''}
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Button component="label" sx={{ color: '#facc15', textTransform: 'none' }}>
                            Browse
                            <input type="file" hidden onChange={handleImage} />
                          </Button>
                        ),
                      }}
                      sx={{ ...inputStyles, width: '100%' }}
                    />
                  </Box>
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
                      Updating...
                    </Box>
                  ) : (
                    'Update Profile'
                  )}
                </Button>
              </form>

              <Divider sx={{ my: 2, bgcolor: '#fff', opacity: 0.3 }} />
              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                Want to go back?{' '}
                <Button
                  onClick={() => window.history.back()}
                  sx={{ textTransform: 'none', color: '#facc15', fontWeight: 'bold' }}
                >
                  Return
                </Button>
              </Typography>
            </Paper>
          </Box>
        </Fade>
      </Slide>

      {/* Enhanced Snackbar */}
      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2500}
        onClose={() => setShowSnackbar(false)}
        sx={{
          mt: 2,
          mr: 2,
          '& .MuiPaper-root': {
            background: 'linear-gradient(135deg, #34d399, #10b981)',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            px: 2,
          },
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          iconMapping={{
            success: <span style={{ fontSize: '1.2rem', marginRight: 8 }}>✅</span>,
          }}
          sx={{
            background: 'transparent',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            alignItems: 'center',
            borderRadius: 8,
            boxShadow: 'none',
          }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateProfile;
