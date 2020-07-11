import Interpreter from "../Interpreter";

class GameEntity {
  constructor(coords, object) {
    this.object = object;
    this.eventQueue = ["Construct"];
    this.ownVars = {
      x: coords.split("_")[0],
      y: coords.split("_")[1],
    };
  }

  update = () => {
    const size = this.eventQueue.length;
    for (let i = 0; i < size; i++) {
      const event = this.eventQueue.shift();
      const interpreter = new Interpreter(this.object.events[event].statements);
      interpreter.interpret();
    }
  };
}

export default GameEntity;
