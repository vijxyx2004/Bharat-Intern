const mongoose = require("mongoose");
const Expenseschema = new mongoose.Schema({
  ExpenseName: {
    type: String,
    requied: true,
  },
  ExpenseDate: {
    type: String,
    requied: true,
  },
  ExpenseAmount: {
    type: Number,
    required: true,
  },
  ExpenseCategory: {
    type: String,
    required: true,
  },
});

const ExpenseModel = mongoose.model("Expenses", Expenseschema);
module.exports = ExpenseModel;
