import GameAnimation from "./GameAnimation";
import GameFunction from "./GameFunction";
import GameObject from "./GameObject";
import GameEntity from "./GameEntity";

class Game {
  constructor(game) {
    this.game = game;
    this.images = this.createImages(game.graphics);
    this.animations = this.createAnimations(game.animations);
    this.functions = this.createFunctions(game.functions);
    this.objects = this.createObjects(game.objects, game.events);
    this.entities = this.createEntities(game.scenes.scenes_0);
    this.width = game.scenes.scenes_0.width;
    this.height = game.scenes.scenes_0.height;
    this.keysPressed = {};
    this.ownVars = {};
    this.canvas = null;
    this.ctx = null;
    this.requestID = null;
    this.FPS = 30;
    this.TIMESTEP = 1000 / this.FPS;
    this.MAX_UPDATES = 5;
    this.lastTimestamp = 0;
    this.delta = 0;
  }

  start = (canvas) => {
    this.canvas = canvas.current;
    this.ctx = this.canvas.getContext("2d");
    this.requestId = requestAnimationFrame(this.mainLoop);
  };

  stop = () => {
    this.canvas = null;
    this.ctx = null;
    cancelAnimationFrame(this.requestId);
  };

  mainLoop = (timestamp) => {
    if (timestamp < this.lastTimestamp + this.TIMESTEP) {
      this.requestId = requestAnimationFrame(this.mainLoop);
      return;
    }
    this.delta += timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    let updates = 0;
    while (this.delta >= this.TIMESTEP) {
      this.update(this.TIMESTEP);
      this.delta -= this.TIMESTEP;
      this.updates++;
      if (updates > this.MAX_UPDATES) {
        this.delta = 0;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.mainLoop);
  };

  update = (timestep) => {
    Object.keys(this.keysPressed).forEach((key) => {
      if (this.keysPressed[key]) {
        this.entities.forEach((entity) =>
          entity.addEvent("Key_Pressed_" + key)
        );
      }
    });
    this.entities.forEach((entity) => entity.update(timestep));
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.entities.forEach((entity) => entity.draw(this.ctx));
  };

  pressKey = (key) => {
    key = key.toUpperCase();
    this.keysPressed[key] = true;
  };

  releaseKey = (key) => {
    key = key.toUpperCase();
    this.keysPressed[key] = false;
    this.entities.forEach((entity) => entity.addEvent("Key_Released_" + key));
  };

  clickMouse = (e) => {
    const coords = this.getMouseCoords(e);
    this.entities.forEach((entity) => entity.clickMouse(coords));
  };

  releaseMouse = (e) => {
    const coords = this.getMouseCoords(e);
    this.entities.forEach((entity) => entity.releaseMouse(coords));
  };

  getMouseCoords = (e) => {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return {
      x: mouseX,
      y: mouseY,
    };
  };

  createImages = (graphics) => {
    const gameGraphics = {};
    Object.keys(graphics).forEach((graphic) => {
      const image = new Image();
      image.src = "img/" + graphics[graphic].filename;
      gameGraphics[graphic] = image;
    });
    return gameGraphics;
  };

  createAnimations = (animations) => {
    return Object.keys(animations).map((anim) => {
      const animation = animations[anim];
      const image = this.images[animation.parent];
      return new GameAnimation(animation, image);
    });
  };

  createFunctions = (functions) => {
    return Object.keys(functions).map(
      (func) => new GameFunction(functions[func], this)
    );
  };

  createObjects = (objects, events) => {
    const gameObjects = {};
    Object.keys(objects).forEach((obj) => {
      const objEvents = {};
      Object.keys(events)
        .filter(
          (event) => event.split("_")[1] + "_" + event.split("_")[2] === obj
        )
        .forEach(
          (event) => (objEvents[this.getEventName(event)] = events[event])
        );
      const gameObject = new GameObject(objects[obj], objEvents, this);
      gameObjects[obj] = gameObject;
    });
    return gameObjects;
  };

  getEventName = (event) => {
    return event
      .split("_")
      .filter((_, i) => i > 2)
      .join("_");
  };

  createEntities = (scene) => {
    return Object.keys(scene.objects).map((entity) => {
      const object = this.objects[scene.objects[entity]];
      return new GameEntity(entity, object, this.getAnimation(object), this);
    });
  };

  getAnimation(object) {
    return this.animations.find(
      (anim) => anim.animation.id === object.object.animation
    );
  }

  isFunction = (name) => {
    return (
      Object.keys(this.game.functions).findIndex(
        (f) => this.game.functions[f].name === name
      ) > -1
    );
  };

  callFunction = (name, values) => {
    const func = this.functions.find((f) => f.func.name === name);
    return func.call(values);
  };
}

export default Game;
