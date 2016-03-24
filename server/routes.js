/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var vote = require('./components/vote');

module.exports = function(app) {

  // Insert routes below
  app.route('/vote')
    .get(function(req, res) {
      res.render('vote');
    });

  app.route('/ballot')
    .get(vote.ballot);

  app.route('/ballot')
    .post(vote.submit);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
