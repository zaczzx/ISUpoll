const User = require('../models/user');
const config = require('./index');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

module.exports = function(passport) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }

  const localLogin = new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, { error: 'Incorrect username. Please try again.' });
      }
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { error: "Incorrect password. Please try again." });
        }
        return done(null, user);
      });
    });
  });

  const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload._id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });

  passport.use(localLogin);
  passport.use(jwtLogin);
};
