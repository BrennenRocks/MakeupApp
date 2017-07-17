/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const User = require('../models/user');
const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');

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
    User.findOne({ username: req.params.username }).select('username email role').exec((err, user) => {
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
  User.findOne({ _id: req.decoded.userId }).select('username email role').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err });
    }else if (!user) {
      res.json({ success: false, message: 'User not found' });
    }else {
      res.json({ success: true, user: user });
    }
  });
});

module.exports = router;