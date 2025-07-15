import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Button,
  Stack,
  Slide,
  Fade,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ConfirmationNumber } from "@mui/icons-material";
import { useGetTicketByEventQuery } from "../../../hooks/react-query/RegistrationQuery";
import backgroundImage from "../../../assets/Poster2.jpg";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// ✅ Styled dark glassmorphic paper with contrast
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.55)", // darker background
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(250, 204, 21, 0.3)",
  width: "100%",
  maxWidth: 400,
  margin: "auto",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  color: "#f8fafc",
  position: "relative",
  zIndex: 2,
}));

const BookTicket = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { data, isLoading, isError } = useGetTicketByEventQuery(eventId);
  const ticket = data?.data;

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  useEffect(() => {
    if (ticket) {
      setTimeout(() => setShowTicket(true), 300);
      setTimeout(() => setShowSnackbar(true), 1000);
    }
  }, [ticket]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (isError || !ticket) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error" variant="h6">
          Ticket not found or you're not registered.
        </Typography>
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: 2,
        py: 6,
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
          zIndex: 0,
        },
        "::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        },
      }}
    >
      {/* ✅ Confetti on top layer */}
      {showTicket && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />
        </Box>
      )}

      {/* ✅ Slide + Fade in ticket */}
      <Slide in={showTicket} direction="up" timeout={600}>
        <Fade in={showTicket} timeout={800}>
          <StyledPaper>
            <Box mb={2}>
              <ConfirmationNumber sx={{ fontSize: 42, color: "#facc15" }} />
              <Typography
                variant="h6"
                fontWeight="bold"
                mt={1}
                sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
              >
                Your Ticket
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: "#facc15" }} />

            <Stack spacing={1.5} sx={{ textAlign: "left" }}>
              <Typography variant="body2" sx={{ textShadow: "1px 1px 2px black" }}>
                <strong style={{ color: "#facc15" }}>🎟 Ticket ID:</strong>{" "}
                {ticket.ticketId}
              </Typography>
              <Typography variant="body2" sx={{ textShadow: "1px 1px 2px black" }}>
                <strong style={{ color: "#facc15" }}>📌 Event:</strong>{" "}
                {ticket.event.title}
              </Typography>
              <Typography variant="body2" sx={{ textShadow: "1px 1px 2px black" }}>
                <strong style={{ color: "#facc15" }}>📅 Date:</strong>{" "}
                {new Date(ticket.event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ textShadow: "1px 1px 2px black" }}>
                <strong style={{ color: "#facc15" }}>📍 Location:</strong>{" "}
                {ticket.event.location}
              </Typography>
            </Stack>

            {ticket.qrCode && (
              <Box mt={3}>
                <Box
                  component="img"
                  src={`data:image/png;base64,${ticket.qrCode}`}
                  alt="QR Code"
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: 2,
                    border: "2px solid #facc15",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
                  }}
                />
                <Typography
                  variant="caption"
                  color="#f8fafc"
                  display="block"
                  mt={1}
                  sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  Scan this QR at the entry
                </Typography>
              </Box>
            )}

            <Box mt={4}>
              <Button
                variant="contained"
                onClick={() => navigate("/eventlist")}
                sx={{
                  backgroundColor: "#facc15",
                  color: "#111827",
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#eab308",
                  },
                }}
              >
                Back to Events
              </Button>
            </Box>
          </StyledPaper>
        </Fade>
      </Slide>

      {/* ✅ Thank You Toast */}
      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" variant="filled" sx={{ fontWeight: "bold" }}>
          🎉 Thank you for registering! Your ticket is ready.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookTicket;
