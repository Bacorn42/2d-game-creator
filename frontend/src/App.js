import React from 'react';
import './App.css';
import FolderView from './components/main/FolderView';
import MainView from './components/main/MainView';
import Toolbar from './components/main/Toolbar';

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
