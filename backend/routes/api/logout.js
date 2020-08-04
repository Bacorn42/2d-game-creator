const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.logOut();
  res.status(200).send();
});

module.exports = router;
