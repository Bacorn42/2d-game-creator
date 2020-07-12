import GameAnimation from "./GameAnimation";
import GameFunction from "./GameFunction";
import GameObject from "./GameObject";
import GameEntity from "./GameEntity";

class Game {
  constructor(game) {
    this.game = game;
    this.animations = this.createAnimations(game.animations, game.graphics);
    this.functions = this.createFunctions(game.functions);
    this.objects = this.createObjects(game.objects, game.events);
    this.entities = this.createEntities(game.scenes.scenes_0);
    this.width = game.scenes.scenes_0.width;
    this.height = game.scenes.scenes_0.height;
    this.keysPressed = {};
  }

  update = () => {
    Object.keys(this.keysPressed).forEach((key) => {
      if (this.keysPressed[key]) {
        this.entities.forEach((entity) =>
          entity.addEvent("Key_Pressed_" + key)
        );
      }
    });
    this.entities.forEach((entity) => entity.update());
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

  createAnimations = (animations, graphics) => {
    return Object.keys(animations).map((anim) => {
      const animation = animations[anim];
      const graphicsFilename = graphics[animation.parent].filename;
      return new GameAnimation(animation, graphicsFilename);
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
