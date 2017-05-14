const Polls = require('../models/poll');

module.exports = function(app, passport) {

  app.get('/api/polls/:username', passport.authenticate('jwt', { session: false }), function(req, res) {
    Polls.find({ username: req.params.username }, function(err, polls) {
      if (err) {
        throw err;
      }
      res.send(polls);
    });
  });

  app.get('/api/polls', function(req, res) {
    Polls.find({}, function(err, polls) {
      if (err) {
        throw err;
      }
      res.send(polls);
    });
  });

  app.get('/api/poll/:id', function(req, res) {
    Polls.findById({ _id: req.params.id }, function(err, poll) {
      if (err) {
        throw err;
      }
      res.send(poll);
    });
  });

  app.post('/api/poll', function(req, res) {
    if (req.body.id) {
      // Update existing poll
      Polls.findByIdAndUpdate(req.body.id, { options: req.body.options }, function(err, poll) {
        if (err) {
          throw err;
        }
        res.json({ message: 'Success' });
      });
    } else {
       // Create new poll
       var newPoll = Polls({
         username: req.body.username,
         name: req.body.name,
         options: req.body.options
       });
       newPoll.save(function(err) {
         if (err) {
           throw err;
         }
         res.json({ message: 'Success' });
       });
    }
  });

  app.delete('/api/poll', passport.authenticate('jwt', { session: false }), function(req, res) {
    Polls.findByIdAndRemove(req.body.id, function(err) {
      if (err) {
        throw err;
      }
      res.json({ message: 'Success' });
    });
  });
};
