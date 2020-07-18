const getObjectNames = (objects) => {
  return Object.keys(objects)
    .filter((x) => x !== "count")
    .map((obj) => objects[obj].name);
};

export default getObjectNames;
