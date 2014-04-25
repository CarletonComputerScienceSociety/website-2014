# CCSS: Carleton Computer Science Society Website #

This is the source code for the Carleton Computer Science Society website.
This should be updated and maintained to include how to guides to assist in
future development of the website. This should be kept relatively to the
point, with more in depth information being placed on the wiki.

## How to Get Started ##

First, ensure that all necessary software has been installed. The necessary list
is:

* [Node.js](http://www.nodejs.org/): Server software, npm package manager
* [Bower.js](http://bower.io/): Client-side package manager
* [Grunt.js](http://gruntjs.com/): JavaScript task runner (similar to make)

Once these are all installed, you need to ensure that you have up to date modules.
This process is needed to reduce the code which is passed around on Github and
reduce the amount of initial downloading needed to get the project on your own
machine.

The two different types of modules we'll be downloading are **npm** and **bower**.
Read below to find out more about these.

First, install the node dependencies. You can do this by going into the project
directory and running `npm install`. You may need root access to do this (add `sudo`).

Next, download and install the necessary bower components. This can be done by
running `bower install`, and again, may need root access.

Once these modules are installed, project is ready to run. As of right now, the
production script is not written (to be completed once the website is ready to
ship). To run the website in development mode, simply run the command `grunt`
from the main directory.

Running the `grunt` command will run a server with livereload, which allows the
website running on the local machine to automatially update and refresh the page
in your browser when ever updates are made. *Note:* this can reduce speed, but
is removed in the production version. This is for development purposes only.

The default port to view the website is **3000**.

To view the website, visit *localhost:3000*.

## Technologies Used ##

### Node.js ###

Node.js is a JavaScript based server back-end which is used on the website.
It comes with **npm** (node package manager) which allows you to easily download
and install libraries onto your server. For those familiar with PHP, think of
this as similar to Apache.

You can learn more about Node and how to install it
[at their website here](http://www.nodejs.org/).

Every Node.js application comes with a **package.json** file which contains a
list of all Node modules which the web application requires. The command to
download and install all necessary libraries is `npm install`.

### Bower.js ###

Bower is a package manager, similar to npm. You can learn more about it
[here](http://bower.io/).

The difference between npm and Bower is that Bower installs *client-side*
libraries as opposed to sever-side. This includes things such as Bootstrap or
jQuery, for those of you familiar with the technologies.

Similar to npm, there is a **bower.json** file which contains a list of all
libraries needed by the client. The command to download and install these
libraries is `bower install`.

### Grunt.js ###

Grunt is a JavaScript task-runner which simplifies the workflow of the website.
The website can be found [here](http://gruntjs.com/).

Plainly put, it's something you can run and it does useful and important things
before the website is ready. This is similar to making or compiling your code
in other languages.

Grunt tasks can be installed, just like regular npm modules. In fact, they are
installed using the same command, `npm install`. More information on how to
install these and how to write a Grunt filecan be found on the website, and a
quick start guide specifically explaining the CCSS one can be found on the wiki.

### Misc. Modules and Libraries Used ###

There are a few modules and libraries being used by each of these three different
pieces of tech. This is a list and a rough explanation as to what they do.

**Node Modules**

* Express v ~3.3.4: This is something to simplify server interactions. Most projects
  use this.
* Jade v ~0.34.0: This is a templating engine commonly used in Express/Node applications.
  A template engine is something that allows you to compile code (.**jade** files in
  this case) to HTML. The great thing about templating is that it can be passed a
  *model* by the server and dynamically fill in blanks left in the template with
  constantly changing data. It also offers a clean way to reuse small portions
  of markup (headers, footers) without messy copy pasting or other less favorable
  methods. A great reference is the [Jade main website](http://jade-lang.com/).
* Grunt v ~0.4.1: This is the task runner mentioned earlier. In reality, it's
  just an npm module. In the config there is also a bunch of grunt modules which
  are used but not mentioned. You can Google those to learn more.

**Bower Modules**

* jQuery v ~2.1.0: This is a very, very common library used to help with cross
  compatibility within browsers and provides lots of simplified functionality
  for very common things.
* Bootstrap v ~3.1.1: This is a very common library which offers styling and
  functionality to assist with simplifying the design process of a website,
  increasing cross compatibility, and provides huge assistance in making an
  application work well on mobile devices.
