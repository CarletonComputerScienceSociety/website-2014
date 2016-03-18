/**
 * Voting services and functions
 */

'use strict';

module.exports.ballot = function (req, res) {
  var viewFilePath = 'ballot';

  var x = req.query.x; //token passed from SCS to us

  //TODO
  // decode x (from base64 byte string) to utf8
  // decrypt x (Blowfish)
  // assign x uid unique to x
  // check if uid has voted already
  // if not, allow x to vote
  // if so, or if invalid x, or if invalid other params, send error.

  res.render(viewFilePath);
};
