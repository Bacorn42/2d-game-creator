const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const game = require("./routes/api/game");
const games = require("./routes/api/games");
const register = require("./routes/api/register");
const login = require("./routes/api/login");
const passport = require("passport");
const session = require("express-session");

const app = express();

require("./config/passport")(passport);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

const db = require("./config/mongodb").URI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/game", game);
app.use("/api/games", games);
app.use("/api/register", register);
app.use("/api/login", login);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
