export const gsDestroy = (game, values) => {
  const entity = values[0];
  entity.addEvent("Destruct");
};

export const gsSetTimer = (game, values) => {
  const timer = values[0];
  const time = values[1];
  game.setTimer(timer, time);
};
export const gsDrawText = (game, values) => {
  const x = values[0];
  const y = values[1];
  const text = values[2];
  const size = values[3];
  game.addDrawing({
    x,
    y,
    text,
    size,
  });
};

export const gsSetAnimation = (game, values) => {
  const entity = values[0];
  const animationName = values[1];
  const animation = game.getAnimationByName(animationName);
  entity.animation = animation;
};

export const gsPlaySound = (game, values) => {
  const sound = values[0];
  game.playSound(sound);
};

export const gsGotoScene = (game, values) => {
  const scene = values[0];
  game.gotoScene(scene);
};

export const gsNextScene = (game, values) => {
  game.nextScene();
};

export const gsPreviousScene = (game, values) => {
  game.previousScene();
};

export const gsCreateEntity = (game, values) => {
  const x = values[0];
  const y = values[1];
  const entity = values[2];
  game.createEntity(x, y, entity);
};
