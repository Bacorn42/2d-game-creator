import React from 'react';
import './App.css';
import FolderView from './components/FolderView';
import MainView from './components/MainView';
import Toolbar from './components/Toolbar';

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
