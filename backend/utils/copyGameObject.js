const copyGameObejct = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (key !== "count") {
      newObj[key] = { ...obj[key] };
    }
  });
  return newObj;
};

module.exports = copyGameObejct;
