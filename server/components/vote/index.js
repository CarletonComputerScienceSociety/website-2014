/**
 * Voting services and functions
 */

'use strict';

//BEGIN testVars
var testx = require('./testx.js').x;
//END testVars

module.exports.ballot = function (req, res) {
  var viewFilePath = 'ballot';

  var x = req.query.x; //token passed from SCS to us

  //BEGIN test
  if(typeof x === 'undefined' || x === undefined || x === '') {
    x = testx;
  }
  //END test

  //TODO
  // (done) ensure the send an x
  // decode x (from base64 byte string) to utf8
  // decrypt x (Blowfish)
  // assign x uid unique to x
  // check if uid has voted already
  // if not, allow x to vote
  // if so, or if invalid x, or if invalid other params, send error.

  //check to make sure they sent an x (redirect from the SCS login)
  if(typeof x === 'undefined' || x === undefined || x === '') {
    res.status(401).send('Try logging in, cheater.');
    return;
  } else {
    console.log(x);
  }

  res.render(viewFilePath);

};
