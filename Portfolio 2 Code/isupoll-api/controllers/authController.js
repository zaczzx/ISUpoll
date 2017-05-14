const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

function createToken(user) {
  return jwt.sign(user, config.secret, { expiresIn: 86400 });
}

function setUserInfo(request) {
  return { _id: request._id, username: request.username };
}

module.exports = function(app, passport) {
  app.get('/api/user/:id', function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err) {
        throw err;
      }
      res.send(user);
    });
  });

  app.post('/api/auth/signup', function(req, res) {
    if (!req.body.username) {
      return res.status(422).send({ error: 'You must enter a username.'});
    }
    if (!req.body.password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        throw err;
      }
      if (user) {
        return res.status(422).send({ error: 'That username is already in use.' });
      }
      let newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      newUser.save(function(err, savedUser) {
        if (err) {
          throw err;
        }
        let userInfo = setUserInfo(savedUser);
        res.status(201).json({
          token: 'JWT ' + createToken(userInfo),
          user: userInfo
        });
      });
    });
  });

  app.post('/api/auth/signin', passport.authenticate('local', { session: false }), function(req, res) {
    let userInfo = setUserInfo(req.user);
    res.status(200).json({ token: 'JWT ' + createToken(userInfo), user: userInfo });
  });
};
