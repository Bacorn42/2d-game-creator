const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("local"), (req, res) => {
  res.status(200).send();
});

router.get("/", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).send();
  }
});

module.exports = router;
