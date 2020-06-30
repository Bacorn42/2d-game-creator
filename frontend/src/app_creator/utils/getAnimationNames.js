const getAnimationNames = ({ graphics, animations }) => {
  const animationNames = Object.keys(animations)
    .filter((x) => x !== "count")
    .map((x) => {
      const animation = animations[x];
      return {
        id: x,
        name: getName(animation.parent, animation.name, graphics),
      };
    });

  return animationNames;
};

const getName = (animationParent, animationName, graphics) => {
  const graphicsName = graphics[animationParent].name;
  return graphicsName + ": " + animationName;
};

export default getAnimationNames;
