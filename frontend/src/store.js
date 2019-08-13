import { createStore } from 'redux';

import dndFolderReducer from './reducers/folderReducer';

const initialState = {
  graphics: {
    count: 0
  },
  audio: {
    count: 0
  },
  functions: {
    count: 0
  },
  objects: {
    count: 0
  },
  scenes: {
    count: 0
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
    count: 0
  },
  folderRoot: ['folder_graphics', 'folder_audio', 'folder_functions', 'folder_objects', 'folder_scenes']
};

export default createStore(dndFolderReducer, initialState);