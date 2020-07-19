class GameCameraVars {
  #game;

  constructor(game, x, y, width, height) {
    this.#game = game;
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(width) {
    this._width = width;
    this.#game.setCameraWidth(width);
  }

  get height() {
    return this._height;
  }

  set height(height) {
    this._height = height;
    this.#game.setCameraHeight(height);
  }
}

export default GameCameraVars;
