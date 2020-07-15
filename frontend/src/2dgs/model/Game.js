import GameAnimation from "./GameAnimation";
import GameFunction from "./GameFunction";
import GameObject from "./GameObject";
import GameEntity from "./GameEntity";
import * as appFunctions from "../appFunctions";

class Game {
  constructor(game) {
    this.game = game;
    this.names = this.createNames(game);
    this.images = this.createImages(game.graphics);
    this.animations = this.createAnimations(game.animations);
    this.functions = this.createFunctions(game.functions);
    this.objects = this.createObjects(game.objects, game.events);
    this.entities = this.createEntities(game.scenes.scenes_0);
    this.width = game.scenes.scenes_0.width;
    this.height = game.scenes.scenes_0.height;
    this.keysPressed = {};
    this.ownVars = {};
    this.timers = new Array(10).fill(-1);
    this.toDraw = [];
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
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i] > 0) {
        this.timers[i]--;
      }
      if (this.timers[i] === 0) {
        this.entities.forEach((entity) => entity.addEvent("Timer_" + i));
        this.timers[i] = -1;
      }
    }
    this.entities.forEach((entity) => entity.update(timestep));
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.entities.forEach((entity) => entity.draw(this.ctx));
    this.toDraw.forEach((drawing) => {
      this.ctx.font = `${drawing.size}px sans-serif`;
      this.ctx.fillText(drawing.text, drawing.x, drawing.y);
    });
    this.toDraw = [];
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

  createNames = (game) => {
    return [
      ...Object.keys(game.graphics).map((x) => game.graphics[x].name),
      ...Object.keys(game.audio).map((x) => game.audio[x].name),
      ...Object.keys(game.functions).map((x) => game.functions[x].name),
      ...Object.keys(game.objects).map((x) => game.objects[x].name),
      ...Object.keys(game.scenes).map((x) => game.scenes[x].name),
      ...Object.keys(game.animations).map((x) => game.animations[x].name),
    ];
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
      return new GameEntity(
        entity,
        object,
        this.getAnimationById(object.object.animation),
        this
      );
    });
  };

  getAnimationById = (id) => {
    return this.animations.find((anim) => anim.animation.id === id);
  };

  getAnimationByName = (name) => {
    return this.animations.find((anim) => anim.animation.name === name);
  };

  isFunction = (name) => {
    if (appFunctions[name]) {
      return true;
    }
    return (
      Object.keys(this.game.functions).findIndex(
        (f) => this.game.functions[f].name === name
      ) > -1
    );
  };

  callFunction = (name, values, thisObject) => {
    if (appFunctions[name]) {
      appFunctions[name](this, values);
    } else {
      const func = this.functions.find((f) => f.func.name === name);
      return func.call(values, thisObject);
    }
  };

  destroy = (entity) => {
    const index = this.entities.findIndex((ent) => ent === entity);
    this.entities.splice(index, 1);
  };

  setTimer = (timer, time) => {
    this.timers[timer] = time;
  };

  addDrawing = (drawing) => {
    this.toDraw.push(drawing);
  };
}

export default Game;
