const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");

// mongoDB connection
mongoose.connect("mongodb://localhost:27017/ExpenseTracker", {});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  res.sendFile(__dirname + "/" + "Nav.html");
});

router.get("/login", async (req, res) => {
  res.sendFile(__dirname + "/" + "login.html");
});

router.get("/signin", async (req, res) => {
  res.sendFile(__dirname + "/" + "signup.html");
});

router.get("/register", async function (req, res) {
  responseToSend = {
    FirstName: req.query.fname,
    LastName: req.query.lname,
    Mobile_No: parseInt(req.query.mobile),
    Email: req.query.email,
    Password: req.query.password,
  };
  let collection = await database.collection("Users");
  let result = await collection.insertOne(responseToSend);
  res.sendFile(__dirname + "/" + "login.html");

  console.log(result);
});

router.get("/user/login", async function (req, res) {
  let userCollection = await database.collection("Users");

  try {
    const checkUser = await userCollection.findOne({ Email: req.query.email });

    if (checkUser) {
      if (checkUser.Password === req.query.password) {
        console.log(checkUser.FirstName + " is Successfully logged in...");
        res.status(200).sendFile(__dirname + "/" + "Home.html");
      } else {
        console.log("Wrong password..");
      }
    } else {
      console.log("Username doesn't exist... Please register to login!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
