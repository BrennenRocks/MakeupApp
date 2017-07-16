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

const authentication = require('./routes/authentication');
const blogs = require('./routes/blogs');

//MIDDLEWARE
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/authentication', authentication);
app.use('/blogs', blogs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
