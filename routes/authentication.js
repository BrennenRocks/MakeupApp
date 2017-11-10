/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const User     = require('../models/user');
const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');
const aws      = require('aws-sdk');
const multer   = require('multer');
const multerS3 = require('multer-s3');
const fs       = require('fs');

aws.config.update({
    secretAccessKey: process.env.SECRETKEY,
    accessKeyId: process.env.KEY,
    region: 'us-west-1'
});
const s3       = new aws.S3();

var imageDomain = 'https://images.raidycheck.com/';
var imageName;

//Register User!
router.post('/register', (req, res) => {
  if (!req.body.email) {
    res.json({ success: false, message: 'You must provide an email' });
  }else if (!req.body.username) {
    res.json({ success: false, message: 'You must provide a username' });
  }else if (!req.body.password) {
    res.json({ success: false, message: 'You must provide a password' });
  }else {
    let user = new User({
      email: req.body.email.toLowerCase(),
      username: req.body.username.toLowerCase(),
      password: req.body.password
    });
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          res.json({ success: false, message: 'Username or Email already exists' });
        }else if (err.errors) {
          if (err.errors.email) {
            res.json({ success: false, message: err.errors.email.message });
          }else if (err.errors.username) {
            res.json({ success: false, message: err.errors.username.message });
          }else if (err.errors.password) {
            res.json({ success: false, message: err.errors.password.message });
          }else {
            res.json({ success: false, message: err });
          }
        }else {
          res.json({ success: false, message: 'Could not save user. Error ', err });
        }
      }else {
        res.json({ success: true, message: 'Account Registered' });
      }
    });
  }
});

//Check if user's email is available for registration
router.get('/checkEmail/:email', (req, res) => {
  if (!req.params.email) {
    res.json({ success: false, message: 'Email was not provided' });
  }else {
    User.findOne({ email: req.params.email }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      }else if (user) {
        res.json({ success: false, message: 'Email is already taken' });
      }else {
        res.json({ success: true, message: 'Email is available' });
      }
    });
  }
});

//Check if user's username is available for registration
router.get('/checkUsername/:username', (req, res) => {
  if (!req.params.username) {
    res.json({ success: false, message: 'Username was not provided' });
  }else {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      }else if (user) {
        res.json({ success: false, message: 'Username is already taken' });
      }else {
        res.json({ success: true, message: 'Username is available' });
      }
    });
  }
});

//Login User
router.post('/login', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: 'No username was provided' });
  }else if (!req.body.password) {
    res.json({ success: false, message: 'No password was provided' });
  }else {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      }else if (!user) {
        res.json({ success: false, message: 'Username not found' });
      }else {
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({ success: false, message: 'Invalid Password' });
        }else {
          const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
          res.json({ success: true, message: 'Success', token: token, user: { username: user.username, role: user.role } });
        }
      }
    });
  }
});

router.get('/publicProfile/:username', (req, res) => {
  if (!req.params.username) {
    res.json({ success: false, message: 'No username was provided' });
  }else {
    User.findOne({ username: req.params.username }).select('-password -image').exec((err, user) => {
      if (err) {
        res.json({ success: false, message: 'Something went wrong' });
      }else if (!user) {
        res.json({ success: false, message: 'Username doesn\'t exist' });
      }else {
        res.json({ success: true, user: user });
      }
    });
  }
});

/***********************************
* Start File Uploading Middleware **
************************************/
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE, //Changes metadata to image/'imageType' on S3
    metadeta: function(req, file, cb){
      cb(null, {fieldName: file.fieldName});
    },
    key: function(req, file, cb){
      if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        var err = new Error();
        err.code = 'filetype';
        return cb(err);
      }else {
        imageName = Math.floor(Date.now() / 60000) + '_' + file.originalname;
        cb(null, imageName);
      }
    }
  }),
  limits: { fileSize: 10000000 }
}).single('file');

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
      }else if (err.code === 'filetype') {
        res.json({ success: false, message: 'File type is invalid. Must be .jpg .jpeg .png' });
      }else {
        console.log(err);
        res.json({ success: false, message: 'File was not able to be uploaded' });
      }
    }else {
      if (!req.file) {
        res.json({ success: false, message: 'No file was selected' });
      }else {
        res.json({ success: true, message: 'Image was uploaded! Be sure to click save!', imagePath: imageDomain + imageName });
      }
    }

  });
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

router.get('/profile', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('-password -image').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err });
    }else if (!user) {
      res.json({ success: false, message: 'User not found' });
    }else {
      res.json({ success: true, user: user });
    }
  });
});

router.put('/updateUser', (req, res) => {
  User.findOne({ _id: req.decoded.userId }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err });
    }else if (!user) {
      res.json({ success: false, message: 'Unable to authenticate user' });
    }else {
      if(user.imagePath !== imageDomain + imageName){
        if (user.imagePath !== 'https://images.raidycheck.com/defaultUser.png') {
          var params = {
           Bucket: process.env.BUCKET,
           Key: user.image
          };
          s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            console.log('Image: ' + user.image + ' successfully deleted from s3');
          });
          user.image = imageName;
        }
        user.imagePath = imageDomain + imageName;
      }

      user.aboutMe = req.body.aboutMe;
      user.save({ validateBeforeSave: false }, (err) => {
        if (err) {
          console.log(err);
          res.json({ success: false, message: err });
        }else {
          res.json({ success: true, message: 'Your information has been updated!' });
        }
      });
    }
  });
});

module.exports = router;
