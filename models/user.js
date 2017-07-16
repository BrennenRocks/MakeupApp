/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
// jscs:disable maximumLineLength
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

let emailLengthChecker = (email) => {
  if (!email) {
    return false;
  }else {
    if (email.length < 5 || email.length > 30) {
      return false;
    }else {
      return true;
    }
  }
};

let validEmailChecker = (email) => {
  if (!email) {
    return false;
  }else {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
};

const emailValidators = [
  {
    validator: emailLengthChecker,
    message: 'Email must be at least 5 characters but no more than 30'
  },
  {
    validator: validEmailChecker,
    message: 'Must be a valid Email'
  }
];

let usernameLengthChecker = (username) => {
  if (!username) {
    return false;
  }else {
    if (username.length < 3 || username.length > 15) {
      return false;
    }else {
      return true;
    }
  }
};

let validUsername = (username) => {
  if (!username) {
    return false;
  }else {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(username);
  }
};

const usernameValidators = [
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },
  {
    validator: validUsername,
    message: 'Only letters and numbers are allowed in your username'
  }
];

let passwordLengthChecker = (password) => {
  if (!password) {
    return false;
  }else {
    if (password.length < 8 || password.length > 35) {
      return false;
    }else {
      return true;
    }
  }
};

let validPassword = (password) => {
  if (!password) {
    return false;
  }else {
    const re = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/;
    return re.test(password);
  }
};

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Passwords must be at least 8 characters but no more than 35'
  },
  {
    validator: validPassword,
    message: 'Passwords must have at least one uppercase, lowercase, special character, and a number'
  }
];

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators },
  role: { type: String, required: false, default: 'user' }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
