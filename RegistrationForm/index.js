var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
cookieParser = require("cookie-parser");
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var store = require("./Registration.js");

app.use("/", store);

app.listen(1127);
