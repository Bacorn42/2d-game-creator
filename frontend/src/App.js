import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faFolderOpen, faImage, faVolumeUp, faFileCode, faCube, faTv, faWindowClose, faWindowMaximize, faWindowRestore, faPlus, faMinus, faAngleUp, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import FolderView from './components/main/FolderView';
import MainView from './components/main/MainView';
import Toolbar from './components/main/Toolbar';

library.add(faFolder, faFolderOpen, faImage, faVolumeUp, faFileCode, faCube, faTv, faWindowClose, faWindowMaximize, faWindowRestore, faPlus, faMinus, faAngleUp, faAngleDown, faAngleRight);

function App() {
  return (
    <div className="app">
      <Toolbar />
      <div className="flex-container">
       <FolderView />
        <MainView />
      </div>
    </div>
  );
}

export default App;
