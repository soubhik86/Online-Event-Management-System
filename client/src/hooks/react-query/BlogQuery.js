import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
 
  postComment,
  getComments,
  toggleLike,
  getAllBlogs,
} from "../../Api/functions/Blog"; // adjust path if needed
import { BLOG_COMMENTS, BLOGS } from "./QueryKey";


// ✅ Get all blogs
export const useGetAllBlogsQuery = () => {
  return useQuery({
    queryKey: [BLOGS],
    queryFn: getAllBlogs ,
  });
};

// ✅ Get comments for a blog
export const useGetCommentsQuery = (blogId) => {
  return useQuery({
    queryKey: [BLOG_COMMENTS, blogId],
    queryFn: () => getComments(blogId),
    enabled: !!blogId,
  });
};

// ✅ Post a comment
export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, commentData }) => postComment(blogId, commentData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([BLOG_COMMENTS, variables.blogId]);
    },
  });
};

// ✅ Toggle like
export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId) => toggleLike(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries([BLOGS]);
    },
  });
};