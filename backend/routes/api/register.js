const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Account = require("../../models/Account");

router.post("/", (req, res) => {
  const { username, password, email } = req.body;

  Account.findOne({ username }).then((user) => {
    if (user) {
      res.status(400).send();
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          const newAccount = new Account({
            username,
            passwordHash: hash,
            email,
          });
          newAccount
            .save()
            .then((user) => {
              res.status(200).send();
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
