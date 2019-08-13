import { createStore } from 'redux';

import dndFolderReducer from './reducers/dndFolderReducer';

const initialState = {
  graphics: {
    
  },
  audio: {
    
  },
  functions: {

  },
  objects: {

  },
  scenes: {

  },
  folders: {
    folder_graphics: {
      id: 'folder_graphics',
      name: 'Graphics',
      parent: null,
      folders: [],
      items: []
    },
    folder_audio: {
      id: 'folder_audio',
      name: 'Audio',
      parent: null,
      folders: [],
      items: []
    },
    folder_functions: {
      id: 'folder_functions',
      name: 'Functions',
      parent: null,
      folders: [],
      items: []
    },
    folder_objects: {
      id: 'folder_objects',
      name: 'Objects',
      parent: null,
      folders: [],
      items: []
    },
    folder_scenes: {
      id: 'folder_scenes',
      name: 'Scenes',
      parent: null,
      folders: [],
      items: []
    },
  },
  folderRoot: ['folder_graphics', 'folder_audio', 'folder_functions', 'folder_objects', 'folder_scenes']
};

export default createStore(dndFolderReducer, initialState);