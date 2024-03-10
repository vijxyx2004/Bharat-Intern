const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
  FirstName: {
    type: String,
    requied: true,
  },
  LastName: {
    type: String,
    requied: true,
  },
  Mobile_No: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("Users", Userschema);
module.exports = UserModel;
