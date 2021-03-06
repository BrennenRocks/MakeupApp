/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let titleLengthChecker = (title) => {
  if (!title) {
    return false;
  }else {
    if (title.length < 5 || title.length > 50) {
      return false;
    }else {
      return true;
    }
  }
};

let alphaNumericTitleChecker = (title) => {
  if (!title) {
    return false;
  }else {
    const re = /^[a-zA-Z0-9 ']+$/;
    return re.test(title);
  }
};

const titleValidators = [
  {
    validator: titleLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];

let bodyLengthChecker = (body) => {
  if (!body) {
    return false;
  }else {
    if (body.length < 5 || body.length > 500) {
      return false;
    }else {
      return true;
    }
  }
};

const bodyValidators = [
  {
    validator: bodyLengthChecker,
    message: 'Body must be at least 5 characters but no more than 500'
  }
];

let commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false;
  }else {
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false;
    }else {
      return true;
    }
  }
};

const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters'
  }
];

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, validate: titleValidators },
  image: { type: String, default: 'https://images.raidycheck.com/defaultBlog.png' },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [
    {
      comment: { type: String, validate: commentValidators },
      commentator: { type: String },
      image: { type: String },
      createdAt: { type: Date, default: Date.now() }
    }
  ]
});

module.exports = mongoose.model('Blog', blogSchema);
