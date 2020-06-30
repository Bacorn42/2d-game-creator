import windowReducerInitialState from '../initialStates/windowReducerInitialState';

const windowReducer = function(state = windowReducerInitialState, action) {
  switch(action.type) {
    case 'OPEN_WINDOW':
      return openWindow(state, action);
    case 'CLOSE_WINDOW':
      return closeWindow(state, action);
    case 'MOVE_WINDOW':
      return moveWindow(state, action);
    case 'FOCUS_WINDOW':
      return focusWindow(state, action);
    default:
      return state;
  }
}

const openWindow = function(state, action) {
  if(state.windows[action.id]) {
    return state;
  }
  return {
    ...state,
    windows: {
      ...state.windows,
      [action.id]: {
       x: 50 + 20 * state.count,
       y: 50 + 20 * state.count
      }
    },
    windows_order: [...state.windows_order, action.id],
    count: (state.count + 1) % 10
  }
}

const closeWindow = function(state, action) {
  const newState = { 
    ...state, 
    windows: { 
      ...state.windows 
    },
    windows_order: [...state.windows_order.filter(x => x !== action.id)]
  };
  delete newState.windows[action.id];
  return newState;
}

const moveWindow = function(state, action) {
  return {
    ...state,
    windows: {
      ...state.windows,
      [action.id]: {
        x: action.x,
        y: action.y
      }
    },
    windows_order: [...state.windows_order.filter(x => x !== action.id), action.id]
  };
}

const focusWindow = function(state, action) {
  return {
    ...state,
    windows_order: [...state.windows_order.filter(x => x !== action.id), action.id]
  };
}

export default windowReducer;