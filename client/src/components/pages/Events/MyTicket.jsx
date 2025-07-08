import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  Grow,
} from '@mui/material';
import { ConfirmationNumber, Download, ErrorOutline } from '@mui/icons-material';
import { useGetMyRegistrationsQuery } from '../../../hooks/react-query/RegistrationQuery';
import { baseURL } from '../../../Api/endPoints/endPoint';
import { QRCodeCanvas } from 'qrcode.react';

const placeholder = 'https://via.placeholder.com/150x100?text=No+Image';

const MyTickets = () => {
  const { data, isLoading, isError } = useGetMyRegistrationsQuery();
  const tickets = data?.data || [];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const downloadQRCode = (ticketId) => {
    const canvas = document.getElementById(`qr-${ticketId}`);
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${ticketId}_qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor="background.default">
        <CircularProgress color="primary" size={60} thickness={4} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        bgcolor="background.default"
      >
        <ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" color="error">
          Error loading tickets. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in={loaded} timeout={700}>
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          minHeight: '100vh',
          mt: 8,
          bgcolor: 'transparent',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        {/* ✅ Header */}
        <Box textAlign="center" mb={6} maxWidth={800} mx="auto" px={2}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
            <ConfirmationNumber
              sx={{
                fontSize: 40,
                color: '#0ef',
                textShadow: '0 0 6px rgba(0,238,255,0.7)',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                color: '#0ef',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                letterSpacing: '0.5px',
                textShadow: '0 0 8px rgba(0,238,255,0.6)',
              }}
            >
              My Tickets
            </Typography>
          </Box>

          <Box
            sx={{
              width: 120,
              height: 4,
              mx: 'auto',
              borderRadius: 4,
              background: 'linear-gradient(to right, #0ef, #38bdf8)',
              mb: 2,
              boxShadow: '0 0 12px rgba(0,238,255,0.4)',
            }}
          />

          <Typography
            variant="subtitle1"
            sx={{
              color: '#cbd5e1',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
              opacity: 0.95,
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            Discover and manage all your event tickets in one place. Stay updated with your upcoming events.
          </Typography>
        </Box>

        {/* ✅ Empty State */}
        {tickets.length === 0 ? (
          <Grow in timeout={600}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
                p: 4,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              <ConfirmationNumber sx={{ fontSize: 60, color: '#0ef', mb: 2 }} />
              <Typography variant="h6" color="#f8fafc" gutterBottom>
                No tickets found
              </Typography>
              <Typography variant="body1" color="#e2e8f0">
                You haven't registered for any events yet. Explore our events to get started!
              </Typography>
            </Box>
          </Grow>
        ) : (
          // ✅ Table with Tickets
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
                  {['Event', 'Date & Time', 'Location', 'Ticket ID', 'QR Code', 'Status'].map((head) => (
                    <TableCell
                      key={head}
                      sx={{
                        fontWeight: 700,
                        color: '#f8fafc',
                        py: 2,
                        borderBottom: 'none',
                        fontSize: '0.95rem',
                        textAlign: head === 'QR Code' ? 'center' : 'left',
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((reg) => {
                  const imgUrl = reg.event.bannerImage
                    ? `${baseURL}/uploads/${reg.event.bannerImage}`
                    : placeholder;

                  return (
                    <TableRow
                      key={reg.ticketId}
                      hover
                      sx={{
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {/* Event */}
                      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3 }}>
                        <Avatar
                          variant="rounded"
                          src={imgUrl}
                          alt={reg.event.title}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1.5,
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                        <Box>
                          <Typography fontWeight={600} sx={{ fontFamily: 'Montserrat', color: '#f1f5f9', mb: 0.5 }}>
                            {reg.event.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                            {reg.event.category}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <Typography color="#f1f5f9" fontWeight={500}>
                          {new Date(reg.event.date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Typography>
                        <Typography variant="body2" color="#cbd5e1">
                          {new Date(reg.event.date).toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </TableCell>

                      {/* Location */}
                      <TableCell>
                        <Typography color="#f8fafc">{reg.event.location}</Typography>
                      </TableCell>

                      {/* Ticket ID */}
                      <TableCell>
                        <Chip
                          label={reg.ticketId}
                          size="small"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            bgcolor: '#0ef',
                            color: '#1e293b',
                          }}
                        />
                      </TableCell>

                      {/* QR Code */}
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              bgcolor: 'rgba(0,0,0,0.2)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            <QRCodeCanvas
                              id={`qr-${reg.ticketId}`}
                              value={reg.ticketId}
                              size={80}
                              level="H"
                              includeMargin
                            />
                          </Box>
                          <Tooltip title="Download QR Code">
                            <IconButton
                              size="small"
                              onClick={() => downloadQRCode(reg.ticketId)}
                              sx={{
                                color: '#0ef',
                                '&:hover': {
                                  bgcolor: 'rgba(14, 238, 255, 0.1)',
                                },
                              }}
                            >
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={reg.status || 'Confirmed'}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            bgcolor: reg.status === 'cancelled' ? 'error.light' : 'success.light',
                            color: reg.status === 'cancelled' ? 'error.dark' : 'success.dark',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Fade>
  );
};

export default MyTickets;
