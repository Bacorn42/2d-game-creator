function GameAnimation(animation, image) {
  this.animation = animation;
  this.image = image;
  this.frames =
    (animation.width * animation.height) /
    (animation.tileWidth * animation.tileHeight);
}

export default GameAnimation;
