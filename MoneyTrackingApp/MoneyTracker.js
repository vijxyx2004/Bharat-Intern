const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
var Blogpage = fs.readFileSync("./blog.html", "utf-8");
var BlogItemshtml = fs.readFileSync("./BlogList.html", "utf-8");

var ExpensePage = fs.readFileSync("./MoneyTracker.html", "utf-8");
var ExpItemhtml = fs.readFileSync("./Expenselist.html", "utf-8");
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

router.get("/home", async (req, res) => {
  res.sendFile(__dirname + "/" + "BeforeLogin.html");
});
router.get("/", async (req, res) => {
  res.sendFile(__dirname + "/" + "Home.html");
});

router.get("/about", async (req, res) => {
  res.sendFile(__dirname + "/" + "about.html");
});

router.get("/contact", async (req, res) => {
  res.sendFile(__dirname + "/" + "contact.html");
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

router.get("/callback", async function (req, res) {
  dataToSend = {
    FirstName: req.query.name,
    Mobile_No: parseInt(req.query.mobile),
    Email: req.query.email,
    Message: req.query.message,
  };
  let collection = await database.collection("CallRequests");
  let result = await collection.insertOne(dataToSend);
  res.sendFile(__dirname + "/" + "Home.html");
  console.log(result);
});
//
router.get("/newpost", async function (req, res) {
  postToSend = {
    Title: req.query.Title,
    Content: req.query.description,
  };
  let collection = await database.collection("Blogs");
  let result = await collection.insertOne(postToSend);
  res.sendFile(__dirname + "/" + "Home.html");
  console.log(result);
});

router.get("/submit-Expense", async function (req, res) {
  dataToSend = {
    ExpenseName: req.query.ExpenseName,
    ExpenceAmount: req.query.ExpenseAmount,
    Category: req.query.expenseCategory,
    ExpenseDate: req.query.ExpenseDate,
  };
  let EXPcollection = await database.collection("Expenses");
  let result = await EXPcollection.insertOne(dataToSend);

  let ExpItems = await EXPcollection.find().toArray();
  let ExpArray = ExpItems.map((Expense) => {
    let output1 = ExpItemhtml.replace(
      "{{%Expense Name%}}",
      Expense.ExpenseName
    );
    output1 = output1.replace("{{%Expense Amount%}}", Expense.ExpenceAmount);
    output1 = output1.replace("{{%Due Date%}}", Expense.ExpenseDate);
    return output1;
  });
  // res.sendFile(__dirname + "/" + "MoneyTracker.html");
  res.end(ExpensePage.replace("{{%content%}}", ExpArray.join(" ")));

  console.log(result);
});

router.get("/blogs", async (req, res) => {
  // res.sendFile(__dirname + "/" + "blog.html");
  const blogCollection = await database.collection("Blogs");
  let BlogItems = await blogCollection.find().toArray();

  let BlogArray = BlogItems.map((blog) => {
    let output = BlogItemshtml.replace("{{%title%}}", blog.Title);
    output = output.replace("{{%blogcontent%}}", blog.Content);
    output = output.replace("{{%blogcontent1%}}", blog.Content);
    return output;
  });
  res.end(Blogpage.replace("{{%blog%}}", BlogArray.join(" ")));
});

router.get("/expense", async (req, res) => {
  let EXPcollection = await database.collection("Expenses");

  let ExpItems = await EXPcollection.find().toArray();
  let ExpArray = ExpItems.map((Expense) => {
    let output = ExpItemhtml.replace("{{%Expense Name%}}", Expense.ExpenseName);
    output = output.replace("{{%Expense Amount%}}", Expense.ExpenceAmount);
    output = output.replace("{{%Due Date%}}", Expense.ExpenseDate);
    return output;
  });
  // res.sendFile(__dirname + "/" + "MoneyTracker.html");
  res.end(ExpensePage.replace("{{%content%}}", ExpArray.join(" ")));
});

module.exports = router;
