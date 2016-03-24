/**
 * Voting services and functions
 */

'use strict';

var config = require('./conf.js');
const crypto = require('crypto');
var dbConn = false;

var mongo = require('mongodb').MongoClient;
mongo.connect(config.mongourl, function(err, db) {
  if(err === null) {
    console.log('Connected correctly to mongodb!');
    dbConn = true;
    db.close();
  } else {
    console.log('Error connecting to mongodb');
  }
});


module.exports.ballot = function (req, res) {
  var viewFilePath = 'ballot';

  var x = new Buffer(unescape(req.query.x).replace('+', ' '), 'binary');

  //TODO
  // (done) ensure they send an x
  // (done) decrypt x (Blowfish)
  // assign x uid unique to x
  // check if uid has voted already
  // if not, allow x to vote
  // if so, or if invalid x, or if invalid other params, send error.

  //check to make sure they sent an x (redirect from the SCS login)
  if(typeof x === 'undefined' || x === undefined || x === '') {
    res.status(401).send('Try logging in, cheater.');
    return;
  }
  else {
    //create Blowfish decrypting object with SCS given key/iv
    var decipher = crypto.createDecipheriv('BF-CBC', config.shared_key, config.iv);
    //this is necessary to account for inter-language encryption
    decipher.setAutoPadding(false);

    //encode the token for use as a request id
    var b64X = x.toString('base64');

    //decrypt token
    var plaintext = decipher.update(x, 'utf8');
    plaintext += decipher.final('utf8');

    //get time= user= and IP= pairs
    var pairs = plaintext.replace('\0', '').split(' ');
    //build object literal from them
    var user = {}
    for(var i=0; i < pairs.length; ++i) {
      var pair = pairs[i].split('=');
      user[pair[0]] = pair[1];
    }

    //if the request IP doesn't match token IP or time since auth greater than a minute
    //then fail the request and ask for new token
    if(/*TEST ->*/ false && (/*<- TEST*/req.ip !== user.IP || (new Date().getTime()/1000 - user.time > 60))) {
      res.status(400).send('Please try logging in again');
      return;
    }
    else {
      //TODO
      //check if user has voted and send res on that
      //if not voted, respond with ballot that can be submitted
      mongo.connect(config.mongourl, function(err, db) {
        if(err !== null) {
          res.status(503).send('The vote database is either down or overloaded. Please try again. If this problem persists, contact the Elections Officer by email.');
          return;
        }
        db.collection('vote-record').find({"user": user.user})
          .each(function(err, doc) {
            if(doc !== null && doc.voted) {
              res.status(200).send('You have already voted. If you believe this message is in error, contact the Elections Officer by email.');
            }
            else {
              res.status(200).send(config.ballotTemplate.replace(/{{x}}/g,b64X));
            }
          });
      });
    }

  }

  //res.render(viewFilePath);

};

module.exports.submit = function(req, res) {
  //TODO make it parse the vote and add it to the database
  res.status(200).send('Got ' + JSON.stringify(req.body));
};
