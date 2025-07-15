import React from "react";
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
  IconButton,
  Container,
  Chip,
  Avatar,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpOutlined,
  Comment,
  Bookmark,
  BookmarkBorder,
  Share,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { baseURL } from "../../Api/endPoints/endPoint";
import {
  useGetAllBlogsQuery,
  useToggleLikeMutation,
} from "../../hooks/react-query/BlogQuery";

const placeholder = "https://via.placeholder.com/600x800/f7f5f1/999999?text=No+Image";

const Blog = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery();
  const { mutate: toggleLike } = useToggleLikeMutation();
  const blogs = data?.data?.blogs || [];
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  // Skeleton loader for loading state
  const renderSkeletons = () => (
    <Grid container spacing={4}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={440}
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <CardContent>
              <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={20} />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={100} height={36} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "#f7f5f1",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Blog Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={700}
            gutterBottom
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "#2b2b2b",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            Stories & Insights
          </Typography>
          <Typography
            variant="subtitle1"
            color="#666"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Discover thought-provoking articles, creative stories, and practical
            insights from our community of writers.
          </Typography>
        </Box>

        {/* Blog Content */}
        {isLoading ? (
          renderSkeletons()
        ) : isError ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="error" gutterBottom>
              Failed to load blogs
            </Typography>
            <Typography color="text.secondary" mb={3}>
              We couldn't fetch the blog posts. Please try again later.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.location.reload()}
              sx={{ px: 4, py: 1.5 }}
            >
              Retry
            </Button>
          </Box>
        ) : blogs.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" gutterBottom>
              No blogs available
            </Typography>
            <Typography color="text.secondary">
              Check back later for new posts or consider contributing your own!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {blogs.map((blog) => {
              const imgUrl = blog?.image
                ? `${baseURL}/uploads/${blog.image}`
                : placeholder;
              const isLiked = blog.likes?.includes(currentUser?._id);
              const isBookmarked = false; // You can implement bookmark functionality

              return (
                <Grid item xs={12} sm={6} md={4} key={blog._id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "transparent",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    {/* Blog Image */}
                    <Box
                      sx={{
                        position: "relative",
                        mb: 3,
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="440"
                        image={imgUrl}
                        alt={blog.title}
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      <Chip
                        label={blog.category || "General"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "background.paper",
                          color: "text.primary",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      />
                    </Box>

                    {/* Blog Content */}
                    <CardContent sx={{ flexGrow: 1, px: 0 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.3,
                          fontSize: "1.25rem",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.content}
                      </Typography>
                    </CardContent>

                    {/* Author and Date */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                        px: 0,
                      }}
                    >
                      <Avatar
                        src={blog.createdBy?.avatar}
                        sx={{ width: 40, height: 40 }}
                      >
                        {blog.createdBy?.name?.charAt(0) || "U"}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {blog.createdBy?.name || "Unknown Author"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(new Date(blog.createdAt), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Blog Actions */}
                    <CardActions
                      sx={{
                        px: 0,
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(0,0,0,0.08)",
                        pt: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                          onClick={() => toggleLike(blog._id)}
                          size="small"
                          sx={{
                            color: isLiked ? "primary.main" : "text.secondary",
                          }}
                        >
                          {isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                        </IconButton>
                        <Typography variant="caption">
                          {blog.likes?.length || 0}
                        </Typography>

                        <IconButton size="small" sx={{ color: "text.secondary" }}>
                          <Comment />
                        </IconButton>
                        <Typography variant="caption">
                          {blog.commentCount || 0}
                        </Typography>
                      </Box>

                      <Box>
                        <IconButton
                          size="small"
                          sx={{ color: "text.secondary", mr: 1 }}
                        >
                          {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                        <IconButton size="small" sx={{ color: "text.secondary" }}>
                          <Share />
                        </IconButton>
                      </Box>
                    </CardActions>

                    {/* Read More Button */}
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 1,
                        borderWidth: 2,
                        borderColor: "text.primary",
                        color: "text.primary",
                        fontWeight: 600,
                        "&:hover": {
                          borderWidth: 2,
                          bgcolor: "text.primary",
                          color: "#f7f5f1",
                        },
                      }}
                    >
                      Read Full Story
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Blog;