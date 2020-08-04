const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("local"), (req, res) => {
  res.status(200).send();
});

router.get("/", (req, res) => {
  res.json(req.user);
});

module.exports = router;
