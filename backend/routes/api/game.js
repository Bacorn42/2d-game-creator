const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const copyGameObject = require("../../utils/copyGameObject");

router.get("/", (req, res) => {
  Game.findOne()
    .then((game) => res.json(game))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const game = req.body;
  const newGame = new Game({
    graphics: copyGameObject(game.graphics),
    audio: copyGameObject(game.audio),
    functions: copyGameObject(game.functions),
    objects: copyGameObject(game.objects),
    scenes: copyGameObject(game.scenes),
    folders: copyGameObject(game.folders),
    animations: copyGameObject(game.animations),
    events: copyGameObject(game.events),
  });

  newGame
    .save()
    .then(() => res.status(200).send())
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

module.exports = router;
