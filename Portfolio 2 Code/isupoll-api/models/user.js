const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Method called before user is saved
// If password was changed or is new,
// the password is encrypted
UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(providedPassword, callback) {
  bcrypt.compare(providedPassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('Users', UserSchema);
