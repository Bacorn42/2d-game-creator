const getAnimationNames = ({ graphics, animations }) => {
  const animationNames = Object.keys(animations)
    .filter((x) => x !== "count")
    .map((x) => {
      const animation = animations[x];
      return {
        [x]: getName(animation.parent, animation.name, graphics),
      };
    });

  console.log(animationNames);

  return animationNames;
};

const getName = (animationParent, animationName, graphics) => {
  const graphicsName = graphics[animationParent].name;
  return graphicsName + ": " + animationName;
};

export default getAnimationNames;
