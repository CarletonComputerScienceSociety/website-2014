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
    fs.readFile("/var/www/website/public/assets/" + req.params.id, function(err, data) {
          if (err) { console.error("404 Error: Attempted to access ['assets/" + req.params.id + "']."); console.error(err); res.render('404'); }
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
    fs.readFile("/var/www/website/public/assets/podcasts/CCSSPodcast"+req.params.id+".mp3", function(err, data) {
      if (err) { console.error("404 Error: Attempted to access ['assets/podcasts/CCSSPodcast" + req.params.id + ".mp3"); res.render('404'); }
      else {
        res.type("audio/mpeg");
        res.send(data);
      }
    });
  }
});

// Create the server and begin listening for connections

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
