const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: String,
  author: String,
  collaborators: [{ type: String }],
  description: String,
  userId: String,
  collaboratorIds: [{ type: String }],
  openSource: Boolean,
  graphics: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      filename: String,
      animations: [String],
    },
  },
  audio: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      filename: String,
    },
  },
  functions: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      code: String,
      args: [String],
    },
  },
  objects: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      events: [String],
      animation: String,
    },
  },
  scenes: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      width: String,
      height: String,
      objects: {
        type: Map,
        of: String,
      },
    },
  },
  folders: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      folders: [String],
      items: [String],
      expanded: Boolean,
    },
  },
  animations: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      top: Number,
      left: Number,
      width: Number,
      height: Number,
      tileWidth: Number,
      tileHeight: Number,
      every: Number,
    },
  },
  events: {
    type: Map,
    of: {
      id: String,
      name: String,
      parent: String,
      code: String,
    },
  },
  sceneOrder: [{ type: String }],
});

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
