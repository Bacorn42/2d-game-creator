const folderReducerInitialState = {
  graphics: {
    count: 0,
  },
  audio: {
    count: 0,
  },
  functions: {
    count: 0,
  },
  objects: {
    count: 0,
  },
  scenes: {
    count: 0,
  },
  folders: {
    folders_graphics: {
      id: "folders_graphics",
      name: "Graphics",
      parent: null,
      folders: [],
      items: [],
      expanded: false,
    },
    folders_audio: {
      id: "folders_audio",
      name: "Audio",
      parent: null,
      folders: [],
      items: [],
      expanded: false,
    },
    folders_functions: {
      id: "folders_functions",
      name: "Functions",
      parent: null,
      folders: [],
      items: [],
      expanded: false,
    },
    folders_objects: {
      id: "folders_objects",
      name: "Objects",
      parent: null,
      folders: [],
      items: [],
      expanded: false,
    },
    folders_scenes: {
      id: "folders_scenes",
      name: "Scenes",
      parent: null,
      folders: [],
      items: [],
      expanded: false,
    },
    count: 0,
  },
  folderRoot: [
    "folders_graphics",
    "folders_audio",
    "folders_functions",
    "folders_objects",
    "folders_scenes",
  ],
  animations: {
    count: 0,
  },
  events: {
    count: 0,
  },
  sceneOrder: [],
};

export default folderReducerInitialState;
