const express = require('express');
const router = express.Router();
const BlogController = require('../controller/BlogController');
const { AuthCheck, authenticateUser} = require('../middleware/AuthMiddleware');
const upload = require('../helper/uploadImage');

// 🌐 EJS Admin Routes
router.get('/admin/blogs', AuthCheck, BlogController.list);
router.get('/admin/blogs/add', AuthCheck, BlogController.create);
router.post('/admin/blogs/add', AuthCheck, upload.single('image'), BlogController.store);

// 📦 API Routes
router.get('/blogs', BlogController.getAllBlogsAPI);
router.post('/blogs/:blogId/comment', AuthCheck, BlogController.addComment);
router.get('/blogs/:blogId/comments', BlogController.getComments);
router.post('/blogs/like/:id', authenticateUser, BlogController.likeBlog);

module.exports = router;
