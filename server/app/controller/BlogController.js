const Blog = require('../model/BlogModel');
const Comment = require('../model/CommentModel');
const User = require('../model/User');
const fs = require('fs');
const path = require('path');

class BlogController {
  // GET: List blogs (EJS)
  async list(req, res) {
    try {
      const blogs = await Blog.aggregate([
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'blogId',
            as: 'comments'
          }
        },
        {
          $addFields: {
            commentCount: { $size: '$comments' }
          }
        },
        {
          $sort: { commentCount: -1, createdAt: -1 }
        }
      ]);
  
      // 🔁 Populate createdBy manually after aggregation
      const populatedBlogs = await Blog.populate(blogs, {
        path: 'createdBy',
        select: 'name email'
      });
  
      res.render('admin/blogList', {
        title: 'Blog Posts',
        blogs: populatedBlogs,
        data: {
          name: req.user?.name || 'Admin',
          email: req.user?.email || 'admin@example.com'
        }
      });
    } catch (err) {
      console.error('Error fetching blogs:', err);
      res.status(500).send('Internal Server Error');
    }
  }
  
  // GET: Show blog create form (EJS)
  async create(req, res) {
    try {
      if (!['admin', 'organizer'].includes(req.user?.role)) {
        return res.status(403).render('unauthorized', { title: 'Access Denied', message: 'Only admin or organizer can create blogs.' });
      }

      res.render('admin/blogForm', {
        title: 'Add Blog',
        blog: {},
        formAction: '/admin/blogs/add',
        data: {
          name: req.user?.name,
          email: req.user?.email
        }
      });
    } catch (err) {
      res.status(500).send('Error rendering blog form');
    }
  }

  // POST: Store blog (EJS form)
  async store(req, res) {
    try {
      const { title, content } = req.body;

      if (!title || !content) throw new Error('Title and content are required');

      const blogData = {
        title,
        content,
        createdBy: req.user._id
      };

      if (req.file) {
        blogData.image = req.file.filename;
      }

      await new Blog(blogData).save();
      req.flash('success', 'Blog posted successfully');
      res.redirect('/admin/blogs');
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('/admin/blogs/add');
    }
  }

  // ✅ API: Get all blogs with comment count (sorted)
  async getAllBlogsAPI(req, res) {
    try {
      const blogs = await Blog.find()
        .populate("createdBy", "name") // ✅ Only populate author's name
        .sort({ commentCount: -1 });   // ✅ Sort by most comments if needed

      res.status(200).json({ success: true, blogs });
    } catch (error) {
      console.error("Get all blogs error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch blogs",
        error: error.message,
      });
    }
  }
  
  

  // ✅ API: Add comment
  async addComment(req, res) {
    try {
      const comment = await Comment.create({
        blogId: req.params.blogId,
        userId: req.user._id,
        comment: req.body.comment
      });
      res.status(201).json({ comment });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add comment', error: err.message });
    }
  }

  // ✅ API: Get comments for a blog
  async getComments(req, res) {
    try {
      const comments = await Comment.find({ blogId: req.params.blogId }).populate('userId', 'name');
      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching comments', error: err.message });
    }
  }

  // ✅ API: Like/unlike blog
  async likeBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });

      const userId = req.user._id;
      const alreadyLiked = blog.likes.includes(userId);

      if (alreadyLiked) {
        blog.likes.pull(userId);
      } else {
        blog.likes.push(userId);
      }

      await blog.save();
      res.status(200).json({
        message: alreadyLiked ? 'Unliked' : 'Liked',
        likes: blog.likes.length
      });
    } catch (err) {
      res.status(500).json({ message: 'Error toggling like', error: err.message });
    }
  }
}

module.exports = new BlogController();
