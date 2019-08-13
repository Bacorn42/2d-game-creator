const dndFolderReducer = function(state, action) {
  switch(action.type) {
    case 'DND_MOVE_ITEM':
      return moveItem(state, action);
    case 'DND_MOVE_FOLDER':
      return moveFolder(state, action);
    default:
      return state;
    }
}

const moveItem = function(state, action) {
  const type = action.id.split('_')[0];
  const item = state[type][action.id];
  if(item.parent === action.to) {
    return state;
  }
  if(type === getRoot(state, state.folders[action.to])) {
    return {
      ...state,
      [type]: {
        ...state[type],
        [action.id]: {
          ...state[type][action.id],
          parent: action.to
        }
      },
      folders: {
        ...state.folders,
        [item.parent]: {
          ...state.folders[item.parent],
          items: state.folders[item.parent].items.filter(x => x !== action.id)
        },
        [action.to]: {
          ...state.folders[action.to],
          items: [...state.folders[action.to].items, action.id]
        }
      }
    };
  }
  return state;
}

const moveFolder = function(state, action) {
  if(state.folders[action.id].parent === null ||
     action.id === action.to ||
     state.folders[action.id].parent === action.to) {
    return state;
  }
  if(getRoot(state, state.folders[action.id]) === getRoot(state, state.folders[action.to])) {
    if(!childOf(state, state.folders[action.to], state.folders[action.id])) {
      const from = state.folders[action.id];
      return {
        ...state,
        folders: {
          ...state.folders,
          [action.id]: {
            ...state.folders[action.id],
            parent: action.to
          },
          [action.to]: {
            ...state.folders[action.to],
            folders: [...state.folders[action.to].folders, action.id]
          },
          [from.parent]: {
            ...state.folders[from.parent],
            folders: state.folders[from.parent].folders.filter(x => x !== action.id)
          }
        }
      };
    }
  }
  return state;
}

const getRoot = function(state, folder) {
  if(folder.parent === null) {
    return folder.id.split('_')[1];
  }
  return getRoot(state, state.folders[folder.parent]);
}

const childOf = function(state, to, from) {
  while(to.parent !== null) {
    if(to.parent === from.id) {
      return true;
    }
    to = state.folders[to.parent];
  }
  return false;
}

export default dndFolderReducer;