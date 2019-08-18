export const getRoot = function(state, folder) {
  if(folder.parent === null) {
    return folder.id.split('_')[1];
  }
  return getRoot(state, state.folders[folder.parent]);
}

export const childOf = function(state, to, from) {
  while(to.parent !== null) {
    if(to.parent === from.id) {
      return true;
    }
    to = state.folders[to.parent];
  }
  return false;
}

export const makeItem = function(type, id, parent) {
  switch(type) {
    case 'graphics':
      return {
        id,
        name: id,
        parent,
        animations: [],
      };
    case 'audio':
      return {
        id,
        name: id,
        parent
      };
    case 'functions':
      return {
        id,
        name: id,
        parent
      };
    case 'objects':
      return {
        id,
        name: id,
        parent
      };
    case 'scenes':
      return {
        id,
        name: id,
        parent
      };
    default:
      return {};
  }
}