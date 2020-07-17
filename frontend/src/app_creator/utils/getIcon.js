const getIcon = (id) => {
  const type = id.split("_")[0];
  switch (type) {
    case "graphics":
      return "image";
    case "audio":
      return "volume-up";
    case "functions":
      return "file-code";
    case "objects":
      return "cube";
    case "scenes":
      return "tv";
    case "folders":
      return "folder";
    case "sceneOrderWindow":
      return "list-ol";
    default:
      return "";
  }
};

export default getIcon;
