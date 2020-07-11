import Parser from "../Parser";

function GameObject(object, events, game) {
  this.events = events;
  this.game = game;
  Object.keys(events).forEach((event) => {
    const parser = new Parser(events[event].code, game);
    events[event].statements = parser.parse();
  });
}

export default GameObject;
