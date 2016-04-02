/**
 * Voting services and functions
 */

'use strict';

var config = require('./conf.js');
var crypto = require('crypto');
var mongo = require('mongodb').MongoClient;

//Allows arbitrary strings to be regex-able patterns (escapes special chars)
RegExp.quote = function(str) {
  return (str + '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};

//This is just early warning if something is up with mongo
mongo.connect(config.mongourl, function(err, db) {
  if(err === null) {
    console.log('Connected correctly to mongodb!');
    db.close();
  } else {
    console.log('Error connecting to mongodb');
  }
});


module.exports.ballot = function (req, res) {

  //order of replace and unescape is important.
  //replace '+' char with spaces, then turn percent encodings into their
  //relevant bytes. The received data is an arbitrary byte string
  var x = new Buffer(unescape(req.query.x.replace(/\+/g, ' ')), 'binary');

  //check to make sure they sent an x (redirect from the SCS login)
  if(typeof x === 'undefined' || x === undefined || x === '') {
    res.status(401).send('Try logging in, cheater.');
    return;
  }
  else {
    try {
      //create Blowfish decrypting object with SCS given key/iv
      var decipher = crypto.createDecipheriv('BF-CBC', config.shared_key, config.iv);
      //this is necessary to account for inter-language encryption
      decipher.setAutoPadding(false);
      //encode the token for use as a request id
      var b64X = x.toString('base64');
      //decrypt token
      var plaintext = decipher.update(x, 'utf8');
      plaintext += decipher.final('utf8');
      //get time= user= and IP= pairs after stripping null byte padding
      var pairs = plaintext.replace(/\u0000/g, '').split(' ');
      //build object literal from them
      var user = {}
      for(var i=0; i < pairs.length; ++i) {
        var pair = pairs[i].split('=');
        user[pair[0]] = pair[1];
      }
    } catch (e) {
      //if decryption/parsing fails, notify, log, and do nothing
      console.log('[' + new Date().toString() + '] - Malformed Token: ' + b64X);
      res.status(401).send('Failed login: malformed token');
      return;
    }

    //if the request IP doesn't match token IP or time since auth greater than a minute
    //then fail the request and ask for new token
    if(req.ip !== user['IP'] || (new Date().getTime()/1000 - user.time > 60)) {
      console.log('[' + new Date().toString() + '] - Strange Token: ' + b64X);
      console.log('  token:');
      for(var key in user) {
        console.log('     ' + key + '=' + user[key]);
      }
      if(req.ip !== user['IP']) {
        console.log('  IP did not match ' + req.ip);
      } else {
        console.log('  time was longer than a minute');
      }
      res.status(400).send('Please try logging in again');
      return;
    }
    else {
      mongo.connect(config.mongourl, function(err, db) {
        //If the database connection fails, tell the user, log the error
        if(err !== null) {
          console.log('[' + new Date().toString() + '] - DB Error: ' + err);
          res.status(503).send('The vote database is either down or overloaded. Please try again. If this problem persists, contact the Elections Officer by email.');
          return;
        }
        //Else, find the user associated with the SCS token
        db.collection('vote-record').findOne({"_id": user.user}, function(err, doc) {
            //if error, notify and log
            if(err !== null) {
              console.log('[' + new Date().toString() + '] - DB Error: ' + err);
              res.status(503).send('The vote database is either down or overloaded. Please try again. If this problem persists, contact the Elections Officer by email.');
              return;
            }
            //If they have a DB record and have voted, tell them politely
            if(doc !== null && doc.voted) {
              res.status(200).send('You have already voted. If you believe this message is in error, contact the Elections Officer by email.');
              db.close();
            }
            else if (doc !== null) {
              //of if the have a record and haven't voted, let them vote
              res.status(200).send(config.ballotTemplate.replace(/{{x}}/g,b64X));
              db.close();
            }
            else {
              //if no record, make them one, then let them vote.
              db.collection('vote-record').insertOne(
                {
                  "_id": user.user,
                  "voted": false,
                  "ballot": {}
                }, function(err, result) {
                  //iff err stuff do err stuff
                  if(err !== null) {
                    console.log('[' + new Date().toString() + '] - DB Error: ' + err);
                    res.status(503).send('The vote database is either down or overloaded. Please try again. If this problem persists, contact the Elections Officer by email.');
                  } else {
                    res.status(200).send(config.ballotTemplate.replace(/{{x}}/g,b64X));
                  }
                  db.close();
              });
            }
          });
      });
    }
  }
};

module.exports.submit = function(req, res) {
  //get their token back from the ballot
  try {
    var x = new Buffer(req.body.x, 'base64');
  } catch (e) {
    console.log('[' + new Date().toString() + '] - Ballot Error Malformed Token: ' + x.toString());
    res.status(400).send('Bad ballot ID. Please try logging in and voting again. If this message persists, please contact the Elections Officer by email.');
    return;
  }

  //build vote object as a record of their ballot
  var vote = {}
  try {
      vote.pres = req.body.pres;
      vote.vpres = req.body.vpres;
      vote.tres = req.body.tres;
      vote.vpa = req.body.vpa;
      vote.vps = req.body.vps;
  } catch (e) {
    //don't fail though, just spoil the ballot basically
    console.log('[' + new Date().toString() + '] - Ballot Error: invalid body=> ' + req.body);
  }

  try {
    //create Blowfish decrypting object with SCS given key/iv
    var decipher = crypto.createDecipheriv('BF-CBC', config.shared_key, config.iv);
    //this is necessary to account for inter-language encryption
    decipher.setAutoPadding(false);
    //decrypt token
    var plaintext = decipher.update(x, 'utf8');
    plaintext += decipher.final('utf8');
    //get time= user= and IP= pairs after removing null byte padding
    var pairs = plaintext.replace(/\u0000/g, '').split(' ');
    //build object literal from them
    var user = {}
    for(var i=0; i < pairs.length; ++i) {
      var pair = pairs[i].split('=');
      user[pair[0]] = pair[1];
    }
  } catch (e) {
    //if decryption fails, modified token, therefore fail and do not log ballot
    //log occurence
    console.log('[' + new Date().toString() + '] - Ballot Malformed Token: ' + x);
    res.status(401).send('Ballot not accepted: malformed token');
    return;
  }

  //If their IP changed, something fishy is up. Log instance, fail ballot
  if(req.ip !== user.IP) {
    console.log('[' + new Date().toString() + '] - Ballot IP Spoof: token=' + user.IP + ' actual=' + req.ip);
    res.status(400).send('Ballot not accepted: Your IP appears spoofed');
    return;
  }

  //get ready to save ballot!
  mongo.connect(config.mongourl, function(err, db) {
    //iff err do err things
    if(err !== null) {
      console.log('[' + new Date().toString() + '] - DB Error: ' + new String(err));
      res.status(503).send('The vote database is either down or overloaded. Please try again. If this problem persists, contact the Elections Officer by email.');
      return;
    }
    //Add the users ballot to their record and mark them as voted
    db.collection('vote-record').updateOne(
      {"_id": user.user, "voted": false},
      {
        $set: { ballot: vote, voted: true }
      },
      function(err, result) {
        //iff err, do err things
        if(err !== null) {
          console.log('[' + new Date().toString() + '] - Ballot recording error: ' + new String(err) + '. Records updated: ' + results.n);
          res.status(503).send('Your ballot could not be recorded. Please try again. If this problem persists, contact the Elections Officer by email.');
        } else if (result.result.n === 0) {
          //or tell them they already voted (may get this from refreshing, etc.)
          res.status(400).send('You have already cast a ballot. If you believe this message is in error, contact the Elections Officer by email.');
        } else {
          //or log and notify that ballot was recorded
          console.log('[' + new Date().toString() + '] - Ballot recorded: ' + result.result.n);
          res.status(200).send('Your ballot has been recorded. Thanks for voting!');
        }
        db.close();
      });
  });

};
