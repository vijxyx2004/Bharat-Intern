const mongoose = require("mongoose");
const Blogschema = new mongoose.Schema({
  BlogName: {
    type: String,
    requied: true,
  },
  BlogDescription: {
    type: String,
    required: true,
  },
  BlogImage: {
    type: String,
    required: true,
  },
  BlogDate: {
    type: String,
    requied: true,
    default:
      "https://img.freepik.com/free-vector/remittance-money-forward-cash-overseas-direct-funding-give-allowance-spare-sum-getting-payroll-transferring-forex-money-drop-coin-isolated-concept-metaphor-illustration_335657-1214.jpg?t=st=1709879930~exp=1709883530~hmac=867c1a8f481f6701c50c33596cddf5d08999bd56d1bf0a317077beb4f80c96d8&w=740",
  },
});

const BlogModel = mongoose.model("Blogs", Blogschema);
module.exports = BlogModel;
