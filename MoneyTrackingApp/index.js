var express = require("express");
var bodyParser = require("body-parser");
cookieParser = require("cookie-parser");
var app = express();
const port = 2000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MoneyTracker = require("./MoneyTracker.js");

app.use("/", MoneyTracker);

app.listen(port);
