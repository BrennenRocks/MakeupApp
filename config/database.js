/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  database: process.env.DATABASE || 'mongodb://localhost:27017/makeupapp',
  secret: crypto
};
