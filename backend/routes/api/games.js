const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/", (req, res) => {
  Game.find({}).then((games) => {
    const gamesArr = [];
    for (const game of games) {
      gamesArr.push({
        id: game._id,
        title: game.title,
        author: game.author,
        description: game.description,
      });
    }
    res.status(200).json(gamesArr);
  });
});

router.get("/:userId", (req, res) => {
  Game.find({ userId: req.params.userId }).then((games) => {
    const gamesArr = [];
    for (const game of games) {
      gamesArr.push({
        id: game._id,
        title: game.title,
        author: game.author,
        description: game.description,
      });
    }
    res.status(200).json(gamesArr);
  });
});

module.exports = router;
