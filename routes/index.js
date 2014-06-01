////////////////////////////////////////////////////////////////////////////////
// File: routes/index.js                                                      //
// This file is really important. What it does is write the functions which   //
// are called when a user types something into the URL or POSTs something     //
// through a form or ajax request. All of these callbacks are put into the    //
// exports object which is returned to app.js when calling the require method.//
//                                                                            //
// ADDING A NEW PAGE                                                          //
// For basic pages that will be accessed by going to 'website.com/foo' where  //
// foo is the page name, you will need to add a callback function to the page //
// array as is shown below. If for some reason the .jade file is named        //
// differently than the page name (that you access through the URL) then this //
// is how to do it. Let's say you have 'bar.jade' and it's accessed by going  //
// to 'website.com/foo'.                                                      //
//                                                                            //
// pages['foo'] = function(req, res) {                                        //
//  res.render('bar', { title: 'Foo Page' + titleSuffix, body: {} });         //
// };                                                                         //
//                                                                            //
// The actual routes are set up in app.js. These are just the functions that  //
// are called when the url is called (GET request performed). Our convention  //
// for the site is to pass a title and a body object to the jade template.    //
// Title is the title of the page and body is any additional data to be sent. //
// The title also includes the titleSuffix, so remember to add that unless you//
// wish for it to not show up (special cases).                                //
////////////////////////////////////////////////////////////////////////////////


var titleSuffix = " | Carleton Computer Science Society"; //Added to the end of each title

var pages = {}; 

// The index page contains a news ticker. All of the articles of the news ticker
// are stored in ../newsArticles.json and are imported here and sent to be compiled
// with jade.
exports.index = function(req, res) {
  var news = require('../newsArticles'); //Pull the JSON file with the articles
  res.render('index', { title: 'Welcome' + titleSuffix, body: {articles: news.articles} });
  var cachedName = require.resolve('../newsArticles'); //Find the name in the require cache
  delete require.cache[cachedName]; // Delete this so that it pulls the latest copy of the JSON file each time
};

pages['about'] = function(req, res) {
  res.render('about', {title: 'About Us' + titleSuffix, body: {} });
};

pages['contact'] = function(req, res) {
  res.render('contact', {title: 'Contact' + titleSuffix, body:{} });
};

pages['extrahelp'] = function(req, res) {
  res.render('extrahelp', {title: 'Getting Extra Help' + titleSuffix, body:{} });
};

pages['courses'] = function(req, res) {
  res.render('courses', {title: 'Course Reference' + titleSuffix, body:{}});
};

pages['events'] = function(req, res) {
  res.render('events', {title: 'Upcoming Events' + titleSuffix, body: {}});
};

pages['arcadebox'] = function(req, res) {
  res.render('arcadebox', {title: 'Arcade Box Submissions' + titleSuffix, body: {}});
};

pages['studentwork'] = function(req, res) {
  res.render('studentwork', {title: 'Student Work' + titleSuffix, body: {}});
};

pages['volunteer'] = function(req, res) {
  res.render('volunteer', {title: 'Volunteer Information' + titleSuffix, body: {}});
};

pages['jobs'] = function(req, res) {
  res.render('jobs', {title: 'Job Postings' + titleSuffix, body: {}});
};

pages['frosh'] = function(req, res) {
  res.render('frosh', {title: 'NotFrosh 2014' + titleSuffix, body: {}});
};

exports.pages = pages;