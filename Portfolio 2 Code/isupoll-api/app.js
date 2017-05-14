const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config');
const apiController = require('./controllers/apiController');
const authController = require('./controllers/authController');
// const setupController = require('./controllers/setupController');

mongoose.connect(config.getDbConnectionString());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(passport.initialize());
require('./config/passport')(passport);

// setupController(app);
authController(app, passport);
apiController(app, passport);

app.listen(config.port);
console.log("Listening on port " + config.port);
