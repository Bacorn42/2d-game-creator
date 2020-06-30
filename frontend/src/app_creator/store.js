import { createStore, combineReducers } from 'redux';

import folderReducer from './reducers/folderReducer';
import windowReducer from './reducers/windowReducer';

export default createStore(combineReducers({
  folderReducer,
  windowReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());