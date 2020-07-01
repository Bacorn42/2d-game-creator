import Parser from "../Parser";

function GameObject(object, events) {
  this.events = events;
  Object.keys(events).forEach((event) => {
    const parser = new Parser(events[event].code);
    events[event].statements = parser.parse();
  });
}

export default GameObject;
