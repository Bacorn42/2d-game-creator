export const getRoot = function (state, folder) {
  if (folder.parent === null) {
    return folder.id.split("_")[1];
  }
  return getRoot(state, state.folders[folder.parent]);
};

export const childOf = function (state, to, from) {
  while (to.parent !== null) {
    if (to.parent === from.id) {
      return true;
    }
    to = state.folders[to.parent];
  }
  return false;
};

export const getCount = function (items) {
  let max = -1;
  Object.keys(items).forEach((key) => {
    const num = Number(key.split("_")[1]);
    if (!isNaN(num)) {
      max = Math.max(max, num);
    }
  });
  return max + 1;
};

export const makeItem = function (type, id, parent) {
  switch (type) {
    case "graphics":
      return {
        id,
        name: id,
        parent,
        filename: "",
        animations: [],
      };
    case "audio":
      return {
        id,
        name: id,
        parent,
        filename: "",
      };
    case "functions":
      return {
        id,
        name: id,
        parent,
        code: "",
        args: [],
      };
    case "objects":
      return {
        id,
        name: id,
        parent,
        events: [],
        animation: "",
      };
    case "scenes":
      return {
        id,
        name: id,
        parent,
        width: "800",
        height: "640",
        objects: {},
      };
    case "animations":
      return {
        id,
        name: id,
        parent,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        tileWidth: 0,
        tileHeight: 0,
        every: 1,
      };
    case "events":
      return {
        id,
        name: id
          .split("_")
          .filter((_, i) => i > 2)
          .join(" "),
        parent,
        code: "",
      };
    default:
      return {};
  }
};
