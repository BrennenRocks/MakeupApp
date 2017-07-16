/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const User     = require('../models/user');
const Blog     = require('../models/blog');
const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');

router.post('/newBlog', (req, res) => {
  if (!req.body.title) {
    res.json({ success: false, message: 'Blog Title is required' });
  }else if (!req.body.body) {
    res.json({ success: false, message: 'Blog Body is required' });
  }else if (!req.body.createdBy) {
    res.json({ success: false, message: 'Blog Creator is required' });
  }else {
    const blog = new Blog({
      title: req.body.title,
      body: req.body.body,
      createdBy: req.body.createdBy
    });
    blog.save((err) => {
      if (err) {
        if (err.errors) {
          if (err.errors.title) {
            res.json({ success: false, message: err.errors.title.message });
          }else if (err.errors.body) {
            res.json({ success: false, message: err.errors.body.message });
          }else {
            res.json({ success: false, message: err.errmsg });
          }
        }else {
          res.json({ success: false, message: err });
        }
      }else {
        res.json({ success: true, message: 'Blog saved!' });
      }
    });
  }
});

router.get('/allBlogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      res.json({ success: false, message: err });
    }else if (!blogs) {
      res.json({ success: false, message: 'No blogs found' });
    }else {
      res.json({ success: true, blogs: blogs });
    }
  }).sort({ _id: -1 });
});

//Middelware to get Token for Login Authorization
router.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.json({ success: false, message: 'No Token provided' });
  }else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Token Invalid: ' + err });
      }else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

router.get('/singleBlog/:id', (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: 'No Blog ID was provided' });
  }else {
    Blog.findOne({ _id: req.params.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Not a valid Blog ID' });
      }else if (!blog) {
        res.json({ success: false, message: 'Blog not found' });
      }else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          }else if (!user) {
            res.json({ success: false, message: 'Unable to authenticate user' });
          }else if (user.username !== blog.createdBy) {
            res.json({ success: false, message: 'You are not authorized to edit this blog post' });
          }else {
            res.json({ success: true, blog: blog });
          }
        });
      }
    });
  }
});

router.put('/updateBlog', (req, res) => {
  if (!req.body._id) {
    res.json({ success: false, message: 'No Blog ID was provided' });
  }else {
    Blog.findOne({ _id: req.body._id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Not a valid Blog ID' });
      }else if (!blog) {
        res.json({ success: false, message: 'Blog ID was not found' });
      }else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          }else if (!user) {
            res.json({ success: false, message: 'Unable to authenticate user' });
          }else if (user.username !== blog.createdBy) {
            res.json({ success: false, message: 'You are not authorized to edit this blog post' });
          }else {
            blog.title = req.body.title;
            blog.body = req.body.body;
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: err });
              }else {
                res.json({ success: true, message: 'Blog Updated!' });
              }
            });
          }
        });
      }
    });
  }
});

router.delete('/deleteBlog/:id', (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: 'No ID provided' });
  }else {
    Blog.findOne({ _id: req.params.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Invalid ID' });
      }else if (!blog) {
        res.json({ success: false, message: 'Blog was not found' });
      }else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          }else if (!user) {
            res.json({ success: false, message: 'Unable to authenticate user' });
          }else if (user.username !== blog.createdBy) {
            res.json({ success: false, message: 'You are not authorized to delete this blog post' });
          }else {
            blog.remove((err) => {
              if (err) {
                res.json({ success: false, message: err });
              }else {
                res.json({ success: true, message: 'Blog deleted!' });
              }
            });
          }
        });
      }
    });
  }
});

router.put('/likeBlog', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No ID was provided' });
  }else {
    Blog.findOne({ _id: req.body.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Invalid Blog ID' });
      }else if (!blog) {
        res.json({ success: false, message: 'That blog was not found' });
      }else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Something went wrong' });
          }else if (!user) {
            res.json({ success: false, message: 'Could not authenticate user' });
          }else if (blog.likedBy.includes(user.username)) { //If user liked post and clicked 'Like' again. It will remove their vote
            blog.likes--;
            const arrayIndex = blog.likedBy.indexOf(user.username);
            blog.likedBy.splice(arrayIndex, 1);
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Blog Unliked' });
              }
            });
          }else if (blog.dislikedBy.includes(user.username)) { //If user has disliked the post, it will be removed when they like the post
            blog.dislikes--;
            const arrayIndex = blog.dislikedBy.indexOf(user.username);
            blog.dislikedBy.splice(arrayIndex, 1);
            blog.likes++;
            blog.likedBy.push(user.username);
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Blog Liked!' });
              }
            });
          }else { //If user has not disliked the post
            blog.likes++;
            blog.likedBy.push(user.username);
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Blog Liked!' });
              }
            });
          }
        });
      }
    });
  }
});

router.put('/dislikeBlog', (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: 'No ID was provided' });
  }else {
    Blog.findOne({ _id: req.body.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Invalid Blog ID' });
      }else if (!blog) {
        res.json({ success: false, message: 'That blog was not found' });
      }else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Something went wrong' });
          }else if (!user) {
            res.json({ success: false, message: 'Could not authenticate user' });
          }else if (blog.dislikedBy.includes(user.username)) { //If user disliked post and clicked 'Dislike' again. It will remove their vote
            blog.dislikes--;
            const arrayIndex = blog.dislikedBy.indexOf(user.username);
            blog.dislikedBy.splice(arrayIndex, 1);
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Blog Undisliked!' });
              }
            });
          }else if (blog.likedBy.includes(user.username)) { //If user has liked the post, it will be removed when they like the post
            blog.likes--;
            const arrayIndex = blog.likedBy.indexOf(user.username);
            blog.likedBy.splice(arrayIndex, 1);
            blog.dislikes++;
            blog.dislikedBy.push(user.username);
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Blog Disliked!' });
              }
            });
          }else { //If user has not disliked the post
            blog.dislikes++;
            blog.dislikedBy.push(user.username);
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Blog Disiked!' });
              }
            });
          }
        });
      }
    });
  }
});

router.post('/comment', (req, res) => {
  if (!req.body.comment) {
    res.json({ success: false, message: 'No comment provided' });
  }else if (!req.body.id) {
    res.json({ success: false, message: 'No ID was provided' });
  }else {
    Blog.findOne({ _id: req.body.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Invalid Blog ID' });
      }else if (!blog) {
        res.json({ success: false, message: 'Blog not found' });
      }else {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Something went wrong' });
          }else if (!user) {
            res.json({ success: false, message: 'User not found' });
          }else {
            blog.comments.push({
              comment: req.body.comment,
              commentator: user.username
            });
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              }else {
                res.json({ success: true, message: 'Comment saved' });
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router;
