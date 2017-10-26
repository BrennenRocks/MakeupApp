/*jshint esversion: 6 */

// jscs:disable requireTrailingComma
const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const config     = require('./config/database');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');

mongoose.connect(config.database, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  }else {
    console.log('Connected to database: ' + config.database);
  }
});

const port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

const authentication = require('./routes/authentication');
const blogs = require('./routes/blogs');
const products = require('./routes/products');

//MIDDLEWARE
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.use('/authentication', authentication);
app.use('/blogs', blogs);
app.use('/products', products);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
