/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const User     = require('../models/user');
const Product  = require('../models/product')
const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');
const fs       = require('fs');

router.get('/allProducts', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.json({ success: false, message: err });
    }else if (!products) {
      res.json({ success: false, message: 'No products found' });
    }else {
      res.json({ success: true, products: products });
    }
  }).sort({ _id: -1 });
});

//TODO: Change this to view and populate comments on a product
router.get("/:username", function(req, res){
    //find the campground with provided ID
    User.find(req.params.username).populate("likedProducts").exec(function(err, user){
        if(err){
            console.log(err);
        } else {
            console.log(user)
            //render show template with that campground
            res.json({ success: true, products: user.likeProducts });
        }
    });
});

//Middelware to get Token for Login Authorization
//If someone has to be logged in for something, put it after this middleware
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

//Admin able to add new post
router.post('/newProduct', (req, res) => {
  if (!req.body.title) {
    res.json({ success: false, message: 'Blog Title is required' });
  }else if (!req.body.body) {
    res.json({ success: false, message: 'Blog Body is required' });
  }else if (!req.body.createdBy) {
    res.json({ success: false, message: 'Blog Creator is required' });
  }else {
    const blog = new Blog({
      title: req.body.title,
      image: req.body.image,
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

module.exports = router;
