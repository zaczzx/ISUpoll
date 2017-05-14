var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  username: String,
  name: String,
  options: Array
});

var Polls = mongoose.model('Polls', pollSchema);

module.exports = Polls;
