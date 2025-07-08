import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Chip,
  ThemeProvider,
  createTheme,
  Stack,
  Container,
} from "@mui/material";
import { Event, Place } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetAllEventQuery } from "../../../hooks/react-query/EventQuery";
import { baseURL } from "../../../Api/endPoints/endPoint";

// Dark Theme Enhanced
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00bcd4" },
    secondary: { main: "#ff4081" },
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

const placeholder = "https://via.placeholder.com/400x200?text=No+Image+Available";

const EventList = () => {
  const { data, isLoading, isError } = useGetAllEventQuery();
  const navigate = useNavigate();
  console.log("API response:", data);
  const events = data?.data?.events || [];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const uniqueCategories = useMemo(() => {
    const categories = new Set(events.map((e) => e.category));
    return ["all", ...Array.from(categories)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return selectedCategory === "all"
      ? events
      : events.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mt: 10,
          py: 6,
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            textAlign="center"
            gutterBottom
          >
            ✨ Explore Events
          </Typography>

          {/* Category Filter */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            my={4}
          >
            {uniqueCategories.map((cat) => (
              <Chip
                key={cat}
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                clickable
                color={selectedCategory === cat ? "primary" : "default"}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  bgcolor: selectedCategory === cat ? "primary.main" : "grey.900",
                  color: selectedCategory === cat ? "#fff" : "grey.300",
                  border: selectedCategory === cat ? "none" : "1px solid #444",
                  boxShadow:
                    selectedCategory === cat
                      ? "0 0 10px rgba(0, 188, 212, 0.6)"
                      : "none",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    color: "#fff",
                  },
                }}
              />
            ))}
          </Stack>

          {/* Main Content */}
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress color="primary" />
            </Box>
          ) : isError ? (
            <Typography color="error" align="center" mt={4}>
              Failed to load events.
            </Typography>
          ) : filteredEvents.length === 0 ? (
            <Typography align="center" mt={4} color="text.secondary">
              No events found in "{selectedCategory}" category.
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {filteredEvents.map((evt) => {
                const imgUrl = evt.bannerImage
                  ? `${baseURL}/uploads/${evt.bannerImage}`
                  : placeholder;

                return (
                  <Grid key={evt._id} item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 4,
                        background: "rgba(18, 18, 18, 0.8)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.6)",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.8)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={imgUrl}
                        alt={evt.title}
                        sx={{
                          objectFit: "cover",
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          boxShadow: "inset 0 0 0 1px #000",
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="primary"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {evt.title}
                          </Typography>
                          <Chip
                            label={evt.status}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              bgcolor: evt.status === "upcoming" ? "secondary.main" : "grey.700",
                              color: "#fff",
                              textTransform: "capitalize",
                            }}
                          />
                        </Box>

                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Category:{" "}
                          <strong style={{ color: "#ccc" }}>
                            {evt.category.charAt(0).toUpperCase() + evt.category.slice(1)}
                          </strong>
                        </Typography>

                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <Event sx={{ fontSize: 18, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(evt.date).toLocaleDateString()} @ {evt.time}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <Place sx={{ fontSize: 18, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">
                            {evt.location}
                          </Typography>
                        </Box>

                        <Box mt={2}>
                          <Typography variant="body2" color="text.secondary">
                            Type:{" "}
                            <strong style={{ color: "#fff", textTransform: "capitalize" }}>
                              {evt.type}
                            </strong>
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            Seats Available:{" "}
                            <strong style={{ color: "#fff" }}>{evt.seats}</strong>
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="secondary"
                            mt={1}
                          >
                            ₹{evt.ticketPrice}
                          </Typography>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ px: 3, pb: 2 }}>
                        <Button
                          size="small"
                          fullWidth
                          onClick={() => navigate(`/eventbyid/${evt._id}`)}
                          variant="contained"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #00bcd4, #2196f3)",
                            color: "#fff",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                              background: "linear-gradient(135deg, #0097a7, #1976d2)",
                              transform: "scale(1.02)",
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EventList;
