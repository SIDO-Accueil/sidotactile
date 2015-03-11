/*eslint-env node*/
/*global __dirname:false*/

var express = require("express");
var app = express();
var path = require("path");

// SERVER CONFIG
var port = process.env.PORT || 8080;        // set our port

// get an instance of the express Router
var router = new express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    "use strict";
    console.log(req.method, " ", req.originalUrl);
    next();
});

// Angular Front-end files
app.use("/public", express.static(path.join(__dirname, "/public")));

// START THE SERVER
app.listen(port);
console.log("Magic happens on port " + port);
