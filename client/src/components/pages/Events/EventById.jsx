import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Paper,
  Divider,
  Stack,
  Grid,
  Fade,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import {
  Event,
  Place,
  Category,
  CurrencyRupee,
  ConfirmationNumber as ConfirmationNumberIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { baseURL } from "../../../Api/endPoints/endPoint";
import { useGetEventByIdQuery } from "../../../hooks/react-query/EventQuery";
import { useRegisterEventMutation } from "../../../hooks/react-query/RegistrationQuery";

const placeholder = "https://via.placeholder.com/800x400?text=No+Image+Available";

// Dynamically load Razorpay's checkout script
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #00bcd4, #2196f3)",
  color: "#fff",
  padding: "12px 28px",
  borderRadius: "50px",
  textTransform: "none",
  fontWeight: "bold",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
  boxShadow: "0 0 14px rgba(33, 150, 243, 0.4)",
  "&:hover": {
    background: "linear-gradient(45deg, #0097a7, #1976d2)",
  },
  "& .MuiCircularProgress-root": {
    marginRight: theme.spacing(1),
  },
}));

const PriceHighlight = styled(Box)(() => ({
  backgroundColor: "#1f2937",
  border: "1px solid #00bcd4",
  borderRadius: 12,
  padding: "8px 18px",
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 700,
  fontSize: "18px",
  color: "#00bcd4",
  fontFamily: "Montserrat",
}));

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

const EventById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetEventByIdQuery(id);
  const { mutate, isLoading: isRegistering } = useRegisterEventMutation();

  const [showPageLoader, setShowPageLoader] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const event = data?.data?.event;
  const imgUrl = event?.bannerImage
    ? `${baseURL}/uploads/${event.bannerImage}`
    : placeholder;

  const handleBookTicket = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("Please log in first to book a ticket.");
      setOpenSnackbar(true);
      return;
    }

    // Free event: skip payment
    if (event.ticketPrice === 0) {
      setShowPageLoader(true);
      return mutate(event._id, {
        onSuccess: () => navigate(`/bookticket/${event._id}`),
        onError: () => setShowPageLoader(false),
      });
    }

    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || typeof window.Razorpay === "undefined") {
      setSnackbarMessage("Failed to load payment gateway. Try again later.");
      setOpenSnackbar(true);
      return;
    }

    // Razorpay options
    const options = {
      key: "rzp_test_1ZNFJliTxKI2kU", // your TEST key
      amount: event.ticketPrice * 100, // in paisa
      currency: "INR",
      name: "QRio Events",
      description: `Booking for ${event.title}`,
      image: "/logo192.png",
      number: "9999999999", // dummy number for testing
      // disable card; allow netbanking, UPI, wallet
      method: { card: true, netbanking: true, upi: true, wallet: true },
      handler: (response) => {
        setShowPageLoader(true);
        mutate(event._id, {
          onSuccess: () => {
            setTimeout(() => navigate(`/bookticket/${event._id}`), 1200);
          },
          onError: (error) => {
            setShowPageLoader(false);
            if (
              error?.response?.data?.message?.includes(
                "already registered"
              )
            ) {
              setSnackbarMessage("You have already booked this event!");
              setOpenSnackbar(true);
            }
          },
        });
      },
      prefill: {
        name: "QRio User",
        email: "test@example.com",
        number: 9999999999,
      },
      theme: { color: "#00bcd4" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (showPageLoader)
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#00bcd4" }} />
      </Box>
    );

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );

  if (isError || !event)
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error" variant="h6">
          Event not found or failed to load.
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Go Back
        </Button>
      </Box>
    );

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0d1117, #1c1c1c)",
        minHeight: "100vh",
        py: 8,
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "rgba(18, 18, 18, 0.9)",
            borderRadius: 4,
            overflow: "hidden",
            width: "100%",
            maxWidth: "1200px",
            p: { xs: 2, md: 4 },
            backdropFilter: "blur(10px)",
            border: "1px solid #2c2c2c",
            color: "#fff",
          }}
        >
          {/* Banner Image */}
          <Box
            component="img"
            src={imgUrl}
            alt={event.title}
            sx={{
              width: "100%",
              height: { xs: 220, sm: 300, md: 460 },
              objectFit: "cover",
              borderRadius: 3,
              mb: 3,
              boxShadow: "0 0 16px rgba(0,0,0,0.4)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.01)" },
            }}
          />

          {/* Title & Status */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            flexWrap="wrap"
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#00bcd4" }}>
              {event.title}
            </Typography>
            <Chip
              label={event.status}
              sx={{
                fontWeight: 600,
                backgroundColor:
                  event.status === "upcoming" ? "#f472b6" : "#64748b", 
                color: "#fff",
                mt: { xs: 2, md: 0 },
              }}
            />
          </Box>

          {/* Info Grid */}
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Event color="primary" />
                <Typography variant="body1">
                  {new Date(event.date).toLocaleDateString()} @ {event.time}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Place color="info" />
                <Typography variant="body1">{event.location}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Category color="success" />
                <Typography variant="body1" textTransform="capitalize">
                  {event.category}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <PriceHighlight>
                <CurrencyRupee />
                {event.ticketPrice || "Free"}
              </PriceHighlight>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: "#374151" }} />

          {/* Description */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", color: "#cbd5e1", fontFamily: "Montserrat" }}
          >
            {event.description || "No description available."}
          </Typography>

          {/* Book Button */}
          <Box textAlign="center" mt={5}>
            <GradientButton
              startIcon={
                <Box display="flex" alignItems="center" justifyContent="center" width="20px" height="20px">
                  <Fade in={isRegistering} timeout={400} unmountOnExit>
                    <Box><CircularProgress size={20} color="inherit" /></Box>
                  </Fade>
                  {!isRegistering && <ConfirmationNumberIcon />}
                </Box>
              }
              disabled={isRegistering}
              onClick={handleBookTicket}
            >
              {isRegistering ? "Booking..." : "Book Ticket"}
            </GradientButton>
          </Box>

          {/* Back Button */}
          <Box textAlign="center" mt={3}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                mt: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Back to Events
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideUpTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" variant="filled" sx={{ fontWeight: "bold" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventById;
