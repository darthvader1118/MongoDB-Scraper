var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var app = express();
var path = require('path');
var mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraper");
var db = mongoose.connection;
var Article = require('./models/Article.js')

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


request("https://www.reddit.com/r/webdev", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var result = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("p.title").each(function(i, element) {

    // Save the text of the element (this) in a "title" variable
    var title = $(this).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the result array we defined earlier
    result.push({
      title: title,
      link: link
    });

  });
});

app.get("/", function(req, res) {
  res.send(index.html);
});


var port = 3000;
app.listen(port, function() {
  console.log('App listening on PORT: ' + port);
});