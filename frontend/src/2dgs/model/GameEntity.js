import Interpreter from "../Interpreter";

class GameEntity {
  constructor(coords, object, animation, game) {
    this.object = object;
    this.animation = animation;
    this.game = game;
    this.id = coords;
    this.eventQueue = [];
    this.addEvent("Construct");
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
    this.addEvent("Update");
    const size = this.eventQueue.length;
    for (let i = 0; i < size; i++) {
      const { eventName, otherObject } = this.eventQueue.shift();
      if (this.object.events[eventName]) {
        const interpreter = new Interpreter(
          this.object.events[eventName].statements,
          this.game,
          this,
          otherObject
        );
        interpreter.interpret();
        if (eventName === "Destruct") {
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

  addEvent = (eventName, otherObject) => {
    this.eventQueue.push({ eventName, otherObject });
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
