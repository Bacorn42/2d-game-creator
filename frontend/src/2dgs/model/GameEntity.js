import Interpreter from "../Interpreter";

class GameEntity {
  constructor(coords, object, animation, game) {
    this.object = object;
    this.animation = animation;
    this.game = game;
    this.id = coords;
    this.eventQueue = ["Construct"];
    this.ownVars = {
      x: Number(coords.split("_")[0]),
      y: Number(coords.split("_")[1]),
    };
  }

  getAnimation = () => {
    return this.animation.animation;
  };

  getFilename = () => {
    return this.animation.filename;
  };

  getX = () => {
    return this.ownVars.x;
  };

  getY = () => {
    return this.ownVars.y;
  };

  update = () => {
    this.eventQueue.push("Update");
    const size = this.eventQueue.length;
    for (let i = 0; i < size; i++) {
      const event = this.eventQueue.shift();
      if (this.object.events[event]) {
        const interpreter = new Interpreter(
          this.object.events[event].statements,
          this.game,
          this
        );
        interpreter.interpret();
      }
    }
  };

  addEvent = (event) => {
    this.eventQueue.push(event);
  };
}

export default GameEntity;
