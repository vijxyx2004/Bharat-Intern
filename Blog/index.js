var express = require("express");
var bodyParser = require("body-parser");
cookieParser = require("cookie-parser");
var app = express();
const port = 2002;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MoneyTracker = require("./Blog.js");

app.use("/", MoneyTracker);

app.listen(port);
