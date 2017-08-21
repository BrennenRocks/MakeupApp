/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const User     = require('../models/user');
const Blog     = require('../models/blog');
const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');
const fs       = require('fs');

module.exports = router;
