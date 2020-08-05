const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const copyGameObject = require("../../utils/copyGameObject");

router.get("/:gameId", (req, res) => {
  Game.findById(req.params.gameId)
    .then((game) => res.json(game))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const user = req.body;
  const newGame = new Game({
    title: "New game",
    author: user.username,
    description: "none",
    userId: user._id,
    openSource: false,
  });

  newGame
    .save()
    .then(() => res.status(200).json(newGame))
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

router.put("/", (req, res) => {
  const { game, id } = req.body;
  Game.findByIdAndUpdate(
    id,
    {
      graphics: copyGameObject(game.graphics),
      audio: copyGameObject(game.audio),
      functions: copyGameObject(game.functions),
      objects: copyGameObject(game.objects),
      scenes: copyGameObject(game.scenes),
      folders: copyGameObject(game.folders),
      animations: copyGameObject(game.animations),
      events: copyGameObject(game.events),
      sceneOrder: game.sceneOrder,
    },
    (err, game) => {
      if (err) {
        console.log(err);
      }
      res.send();
    }
  );
});

module.exports = router;
