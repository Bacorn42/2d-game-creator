const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/", (req, res) => {
  Game.find({}).then((games) => {
    const gamesArr = [];
    for (const game of games) {
      gamesArr.push({
        id: game._id,
        title: "Game Title",
        author: "Author",
        description: "The is a game. You can play it. It does stuff. Yay!",
      });
    }
    res.status(200).json(gamesArr);
  });
});

module.exports = router;
