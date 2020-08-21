var history = require("connect-history-api-fallback");
var express = require("express");

var serveStatic = require("serve-static");
var app = express();
//add this middleware
app.use(history());
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
