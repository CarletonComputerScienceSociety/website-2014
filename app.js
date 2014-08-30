var express = require('express')
  , routes  = require('./routes')
  , fs      = require('fs')
  , http    = require('http')
  , path    = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon("public/img/favicon.ico"));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));  
});

app.get('/', routes.index);

// This sets up the URL routes that people can access for all basic URLs. If the
// URL isn't found in our pages array, it responds with a 404 and logs the attempt
// To form more complicated URLs, such as /podcast/episodes/3 or something, look
// up documentation for Express 3

app.get('/:id', function(req, res, next) { 
  if (routes.pages[req.params.id])
    routes.pages[req.params.id](req,res,next);
  else {
    console.error("404 Error: Attempted to access ['" + req.params.id + "'].");
    res.render('404');
  }
});


// A function taken from http://stackoverflow.com/questions/10865347/node-js-get-file-extension
// It takes in a filename and returns the filetype. This is useful when trying
// to provide special types which are handled differently in the browser
// (audio files, PDF, etc.)

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

// This sets up the special /assets directory. All files in /assets can be accessed
// by visiting /assets/foo.bar and can be linked as such. This shouldn't need to
// be changed.


app.get('/assets/:id', function(req, res, next) {
  if (req.params.id) {
    fs.readFile("./public/assets/" + req.params.id, function(err, data) {
          if (err) { console.error("404 Error: Attempted to access ['assets/" + req.params.id + "']."); res.render('404'); }
          else {
            // Right now, there's only PDF's on the website that we need to worry
            // about.
            if (getExtension(req.params.id) === ".pdf") {
              res.contentType("application/pdf")
            }
            res.send(data);
          }
        });
  }
});

app.get('/assets/podcasts/:id', function(req, res, next) {
  if (req.params.id) {
    fs.readFile("./public/assets/podcasts/CCSSPodcast"+req.params.id+".mp3", function(err, data) {
      if (err) { console.error("404 Error: Attempted to access ['assets/podcasts/CCSSPodcast" + req.params.id + ".mp3"); res.render('404'); }
      else {
        res.type("audio/mpeg");
        res.send(data);
      }
    });
  }
});

app.post('/frosh', function (req, res) {
  var config = require('./data/config.json');
  var stripe = require("stripe")(config.stripePrivateKey)
  var stripeToken = req.body.stripeToken;
  
  var charge = stripe.charges.create({
    amount: 1500,
    currency: "cad",
    card: stripeToken,
    description: "CCSS Presents NotFrosh"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError')
    {
      res.render("froshFailed", {body: { err: err } }); // just in case something weird happens and stripe can't handle it
      return;
    }
    var ticket = randomString(8);
    res.render("froshConfirm", {body: { ticketCode: ticket } });
    
    //Email address is configured in data/config.json
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.noreplyEmail, 
        pass: config.noreplyPassword
      }
    });
    
    transporter.sendMail({
      from: config.noreplyEmail,
      to: req.body.stripeEmail,
      bcc: config.volunteerEmail,
      subject: 'NotFrosh - Ticket Purchase',
      text: 'Hi,\n\nThank you for registering for !Frosh.\n\n' +
            'You purchased a NotFrosh ticket ($15.00)\n' +
            'Your ticket number is: *' + ticket + '*\n\n' +
            'Make sure to bring your ticket number to the event on September 6\n' +
            'If you plan to receive a !Frosh t-shirt (included in ticket price) please send an email to Matt Diener (matt.diener@ccss.carleton.ca) with sizing information by 11:59PM Thursday, September 4th.\n' +
            'You will be receiving more information about meeting up and what to bring prior to the event at this email address.\n\n' +
            'Contact matt.diener@ccss.carleton.ca with any questions about the event or about health and allergy concerns.\n\n' + 
            'Enjoy NotFrosh!'
    });
  });
  
  
});

// Create the server and begin listening for connections

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
