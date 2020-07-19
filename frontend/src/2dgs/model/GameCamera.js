import GameCameraVars from "./GameCameraVars";

class GameCamera {
  constructor(game, x, y, width, height) {
    this.ownVars = new GameCameraVars(game, x, y, width, height);
  }

  getX = () => {
    return this.ownVars.x;
  };

  getY = () => {
    return this.ownVars.y;
  };
}

export default GameCamera;
