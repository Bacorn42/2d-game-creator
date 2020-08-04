const LocalStrategy = require("passport-local").Strategy;
const Account = require("../models/Account");
const bcrypt = require("bcrypt");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      Account.findOne({ username })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log("USER");
    Account.findById(id, (err, user) => {
      console.log(user);
      done(err, user);
    });
  });
};
