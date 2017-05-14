var Polls = require('../models/poll');

module.exports = function(app) {
  app.get('/api/setupPolls', function(req, res) {
    var seedPolls = [
      {
        username: 'test',
        name: 'Best Sport',
        isClosed: true,
        options: [{title: 'Basketball', count: 4}, {title: 'Football', count: 5}, {title: 'Baseball', count: 1}, {title: 'Soccer', count: 2}, {title: 'Volleyball', count: 2}]
      },
      {
        username: 'test2',
        name: 'Blue or Red',
        isClosed: true,
        options: [{title: 'Blue', count: 12}, {title: 'Red', count: 23}]
      },
      {
        username: 'test3',
        name: 'Favorite Programming Language',
        isClosed: true,
        options: [{title: 'Java', count: 10}, {title: 'Javascript', count: 8}, {title: 'C', count: 3}, {title: 'C++', count: 3}, {title: 'Swift', count: 4}, {title: 'Python', count: 1}]
      }
    ];

    Polls.create(seedPolls, function(err, results) {
      res.send(results);
    });
  });
};
