const getWindowName = (state, id) => {
  const itemType = id.split("_")[0];
  const name = state[itemType]?.[id].name;
  if (name) {
    return name;
  } else {
    switch (id) {
      case "sceneOrderWindow":
        return "Scene Order";
      default:
        throw Error("Unknown Window");
    }
  }
};

export default getWindowName;
