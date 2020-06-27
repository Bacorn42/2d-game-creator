const express = require("express");
const mongoose = require("mongoose");
const game = require("./routes/api/game");

const app = express();

app.use(express.json());

const db = require("./config/mongodb").URI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/game", game);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
