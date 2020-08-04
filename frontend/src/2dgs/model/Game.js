import GameAnimation from "./GameAnimation";
import GameFunction from "./GameFunction";
import GameObject from "./GameObject";
import GameEntity from "./GameEntity";
import * as appFunctions from "../appFunctions";
import GameCamera from "./GameCamera";

class Game {
  constructor(game) {
    this.game = game;
    this.currentScene = 0;
    this.title = game.title;
    this.author = game.author;
    this.description = game.description;

    this.names = this.createNames(game);
    this.images = this.createImages(game.graphics);
    this.animations = this.createAnimations(game.animations);
    this.sounds = this.createSounds(game.audio);
    this.functions = this.createFunctions(game.functions);
    this.objects = this.createObjects(game.objects, game.events);
    this.entities = null;
    this.camera = null;

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
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.setScene();
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
      updates++;
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
        this.entities.forEach((entity) => entity.addEvent("Key_Held_" + key));
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
    this.checkCollisions();
    this.entities.forEach((entity) => entity.update(timestep));
  };

  draw = () => {
    const offsetX = this.camera.getX();
    const offsetY = this.camera.getY();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.entities.forEach((entity) => entity.draw(this.ctx, offsetX, offsetY));
    this.toDraw.forEach((drawing) => {
      this.ctx.font = `${drawing.size}px sans-serif`;
      this.ctx.fillText(drawing.text, drawing.x - offsetX, drawing.y - offsetY);
    });
    this.toDraw = [];
  };

  checkCollisions = () => {
    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const e1 = this.entities[i];
        const e2 = this.entities[j];
        const coords1 = {
          x1: e1.getX(),
          y1: e1.getY(),
          x2: e1.getX() + e1.getWidth(),
          y2: e1.getY() + e1.getHeight(),
        };
        const coords2 = {
          x1: e2.getX(),
          y1: e2.getY(),
          x2: e2.getX() + e2.getWidth(),
          y2: e2.getY() + e2.getHeight(),
        };
        if (this.entitiesCollide(coords1, coords2)) {
          e1.addEvent("Collision_With_" + e2.object.object.name, e2);
          e2.addEvent("Collision_With_" + e1.object.object.name, e1);
        }
      }
    }
  };

  // Two rectangles do not overlap if either one is completely above the other
  // or one if completely to the right of another
  entitiesCollide = (coords1, coords2) => {
    if (coords1.x1 >= coords2.x2 || coords2.x1 >= coords1.x2) {
      return false;
    }
    if (coords1.y1 >= coords2.y2 || coords2.y1 >= coords1.y2) {
      return false;
    }
    return true;
  };

  pressKey = (key) => {
    key = key.toUpperCase();
    if (!this.keysPressed[key]) {
      this.entities.forEach((entity) => entity.addEvent("Key_Pressed_" + key));
    }
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

  createSounds = (audio) => {
    const gameAudio = {};
    Object.keys(audio).forEach((sound) => {
      gameAudio[audio[sound].name] = new Audio("snd/" + audio[sound].filename);
    });
    return gameAudio;
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

  playSound = (sound) => {
    this.sounds[sound].play();
  };

  getCurrentScene = () => {
    const sceneOrder = this.game.sceneOrder;
    return this.game.scenes[sceneOrder[this.currentScene]];
  };

  setScene = () => {
    const scene = this.getCurrentScene();
    this.entities = this.createEntities(scene);
    this.camera = new GameCamera(this, 0, 0, scene.width, scene.height);
    this.canvas.width = scene.width;
    this.canvas.height = scene.height;
    this.timers = new Array(10).fill(-1);
    this.toDraw = [];
    this.lastTimestamp = 0;
    this.delta = 0;
  };

  gotoScene = (scene) => {
    this.currentScene = this.game.sceneOrder.findIndex(
      (s) => this.game.scenes[s].name === scene
    );
    this.setScene();
  };

  nextScene = () => {
    this.currentScene++;
    this.setScene();
  };

  previousScene = () => {
    this.currentScene--;
    this.setScene();
  };

  createEntity = (x, y, entity) => {
    const coords = x + "_" + y;
    const object = Object.keys(this.objects).find(
      (o) => this.objects[o].object.name === entity
    );
    const newEntity = new GameEntity(
      coords,
      this.objects[object],
      this.getAnimationById(this.objects[object].object.animation),
      this
    );
    this.entities.push(newEntity);
  };

  setCameraWidth = (width) => {
    this.canvas.width = width;
  };

  setCameraHeight = (height) => {
    this.canvas.height = height;
  };
}

export default Game;
