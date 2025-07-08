import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get(endPoints.blog.getAll);
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

// Add comment to a blog
export const postComment = async (blogId, commentData) => {
  try {
    const response = await axiosInstance.post(endPoints.blog.comment(blogId), commentData);
    return response;
  } catch (error) {
    console.error("Error adding comment:", error.response?.data || error.message);
    throw error;
  }
};

// Get comments of a blog
export const getComments = async (blogId) => {
  try {
    const response = await axiosInstance.get(endPoints.blog.getComments(blogId));
    return response;
  } catch (error) {
    console.error("Error fetching comments:", error.response?.data || error.message);
    throw error;
  }
};

// Like or unlike a blog
export const toggleLike = async (blogId) => {
  try {
    const response = await axiosInstance.post(
      endPoints.blog.like(blogId),
      {}, // No body
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error.response?.data || error.message);
    throw error;
  }
};