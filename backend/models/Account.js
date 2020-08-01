const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("account", AccountSchema);

module.exports = Account;
