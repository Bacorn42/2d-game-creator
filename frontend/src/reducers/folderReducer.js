import { getRoot, childOf, makeItem } from '../utils/folderReducerUtils';
import folderReducerInitialState from '../initialStates/folderReducerInitialState';

const folderReducer = function(state = folderReducerInitialState, action) {
  switch(action.type) {
    case 'DND_MOVE_ITEM':
      return moveItem(state, action);
    case 'DND_MOVE_FOLDER':
      return moveFolder(state, action);
    case 'CREATE_FOLDER':
      return createFolder(state, action);
    case 'DELETE_FOLDER':
      return deleteFolder(state, action);
    case 'CREATE_ITEM':
      return createItem(state, action);
    case 'DELETE_ITEM':
      return deleteItem(state, action);
    case 'MODIFY_ITEM':
      return modifyItem(state, action);
    case 'CREATE_ANIMATION':
      return createAnimation(state, action);
    case 'DELETE_ANIMATION':
      return deleteAnimation(state, action);
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

const createFolder = function(state, action) {
  const newId = 'folder_' + state.folders.count;
  return {
    ...state,
    folders: {
      ...state.folders,
      [newId]: {
        id: newId,
        name: newId,
        parent: action.id,
        folders: [],
        items: []
      },
      [action.id]: {
        ...state.folders[action.id],
        folders: [...state.folders[action.id].folders, newId]
      },
      count: state.folders.count + 1
    }
  }
}

const deleteFolder = function(state, action) {
  const parent = state.folders[action.id].parent;
  if(parent === null) {
    return state;
  }
  let newState = {
    ...state,
    folders: {
      ...state.folders,
      [parent]: {
        ...state.folders[parent],
        folders: state.folders[parent].folders.filter(x => x !== action.id)
      }
    }
  };
  for(const item of state.folders[action.id].items) {
    newState = deleteItem(newState, { type: 'DELETE_ITEM', id: item });
  }
  for(const folder of state.folders[action.id].folders) {
    newState = deleteFolder(newState, { type: 'DELETE_FOLDER', id: folder });
  }
  delete newState.folders[action.id];
  return newState;
}

const createItem = function(state, action) {
  const type = getRoot(state, state.folders[action.id]);
  const newId = type + "_" + state[type].count;
  return {
    ...state,
    [type]: {
      ...state[type],
      [newId]: makeItem(type, newId, action.id),
      count: state[type].count + 1
    },
    folders: {
      ...state.folders,
      [action.id]: {
        ...state.folders[action.id],
        items: [...state.folders[action.id].items, newId]
      }
    }
  };
}

const deleteItem = function(state, action) {
  const type = action.id.split('_')[0];
  const parent = state[type][action.id].parent;
  const newState = {
    ...state,
    folders: {
      ...state.folders,
      [parent]: {
        ...state.folders[parent],
        items: state.folders[parent].items.filter(x => x !== action.id)
      }
    }
  };
  delete newState[type][action.id];
  return newState;
}

const modifyItem = function(state, action) {
  const type = action.item.id.split('_')[0];
  return {
    ...state,
    [type]: {
      ...state[type],
      [action.item.id]: action.item
    }
  };
}

const createAnimation = function(state, action) {
  const newId = "animations_" + state.animations.count;
  return {
    ...state,
    graphics: {
      ...state.graphics,
      [action.id]: {
        ...state.graphics[action.id],
        animations: [...state.graphics[action.id].animations, newId]
      }
    },
    animations: {
      ...state.animations,
      [newId]: makeItem('animations', newId, action.id),
      count: state.animations.count + 1
    }
  };
}

const deleteAnimation = function(state, action) {
  const animation = state.animations[action.id];
  const newState = {
    ...state,
    graphics: {
      ...state.graphics,
      [animation.parent]: {
        ...state.graphics[animation.parent],
        animations: state.graphics[animation.parent].animations.filter(x => x !== action.id)
      }
    },
    animations: {
      ...state.animations,
    }
  };
  delete newState.animations.id;
  return newState;
}

export default folderReducer;