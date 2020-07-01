import GameFunction from "./GameFunction";
import GameObject from "./GameObject";
import GameEntity from "./GameEntity";

class Game {
  constructor(game) {
    this.functions = this.createFunctions(game.functions);
    this.objects = this.createObjects(game.objects, game.events);
    this.entities = this.createEntities(game.scenes.scenes_0);
  }

  update = () => {
    this.entities.forEach((entity) => entity.update());
  };

  createFunctions = (functions) => {
    return Object.keys(functions).map(
      (func) => new GameFunction(functions[func])
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
      const gameObject = new GameObject(objects[obj], objEvents);
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
      return new GameEntity(entity, this.objects[scene.objects[entity]]);
    });
  };
}

export default Game;
