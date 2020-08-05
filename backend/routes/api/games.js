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
        collaborators: game.collaborators,
        description: game.description,
      });
    }
    res.status(200).json(gamesArr);
  });
});

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  Game.find()
    .or([{ userId: id }, { collaboratorIds: id }])
    .then((games) => {
      const gamesArr = [];
      for (const game of games) {
        gamesArr.push({
          id: game._id,
          title: game.title,
          author: game.author,
          collaborators: game.collaborators,
          description: game.description,
        });
      }
      res.status(200).json(gamesArr);
    });
});

module.exports = router;
