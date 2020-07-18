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
    this.sprite = 0;
    this.spriteCount = 0;
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

  getWidth = () => {
    return this.animation.animation.tileWidth;
  };

  getHeight = () => {
    return this.animation.animation.tileHeight;
  };

  update = (timestep) => {
    this.updateSprite();
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
        if (event === "Destruct") {
          this.game.destroy(this);
          return;
        }
      }
    }
  };

  updateSprite = () => {
    this.spriteCount++;
    if (this.spriteCount === this.animation.animation.every) {
      this.spriteCount = 0;
      this.sprite = (this.sprite + 1) % this.animation.frames;
    }
  };

  draw = (ctx) => {
    const animation = this.animation.animation;
    ctx.drawImage(
      this.animation.image,
      animation.left + animation.tileWidth * this.sprite,
      animation.top,
      animation.tileWidth,
      animation.tileHeight,
      this.ownVars.x,
      this.ownVars.y,
      animation.tileWidth,
      animation.tileHeight
    );
  };

  addEvent = (event) => {
    this.eventQueue.push(event);
  };

  clickMouse = (coords) => {
    if (this.inBounds(coords)) {
      this.addEvent("Mouse_Clicked");
    }
  };

  releaseMouse = (coords) => {
    if (this.inBounds(coords)) {
      this.addEvent("Mouse_Released");
    }
  };

  inBounds = (coords) => {
    const { x, y } = this.ownVars;
    const width = this.animation.animation.tileWidth;
    const height = this.animation.animation.tileHeight;
    return (
      coords.x >= x &&
      coords.x < x + width &&
      coords.y >= y &&
      coords.y < y + height
    );
  };
}

export default GameEntity;
