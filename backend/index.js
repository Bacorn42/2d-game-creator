const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = require("./config/mongodb").URI;

mongoose
  .connect(db)
  .then(() => console.log("MondoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
