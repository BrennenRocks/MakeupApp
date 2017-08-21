/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '/images/defaultBlog.png' },
  categories: [
    {
      displayName: String,
      category: String
    }
  ],
  vendors: [
    {
      name: String,
      price: String
    }
  ],
  comments: [
    {
      comment: { type: String, validate: commentValidators },
      commentator: { type: String },
      image: { type: String },
      createdAt: { type: Date, default: Date.now() }
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
