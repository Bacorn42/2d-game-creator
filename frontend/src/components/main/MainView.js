import React, { Component } from 'react';
import { connect } from 'react-redux';
import WindowGraphics from '../window/WindowGraphics';
import WindowAudio from '../window/WindowAudio';
import WindowFunctions from '../window/WindowFunctions';
import WindowFolders from '../window/WindowFolders';
import { closeWindow, moveWindow, focusWindow } from '../../actions/windowActions';
import { modifyItem, createAnimation, deleteAnimation } from '../../actions/folderActions';

export class MainView extends Component {
  getNames = () => {
    const { graphics, audio, functions, objects, scenes, animations } = this.props;
    return [
      ...Object.keys(graphics).map(x => graphics[x].name),
      ...Object.keys(audio).map(x => audio[x].name),
      ...Object.keys(functions).map(x => functions[x].name),
      ...Object.keys(objects).map(x => objects[x].name),
      ...Object.keys(scenes).map(x => scenes[x].name),
      ...Object.keys(animations).map(x => animations[x].name),
    ]
  }

  getWindow = (window) => {
    const { graphics, audio, functions, folders, animations, windows, closeWindow, focusWindow, modifyItem, createAnimation, deleteAnimation } = this.props;
    const type = window.split('_')[0];
    switch(type) {
      case 'graphics':
        return <WindowGraphics key={window} item={graphics[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} focusWindow={focusWindow} animations={animations} modifyItem={modifyItem} createAnimation={createAnimation} deleteAnimation={deleteAnimation} />
      case 'audio':
        return <WindowAudio key={window} item={audio[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} focusWindow={focusWindow} modifyItem={modifyItem} />
      case 'functions':
        return <WindowFunctions key={window} item={functions[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} focusWindow={focusWindow} modifyItem={modifyItem} names={this.getNames()} />
      case 'folders':
          return <WindowFolders key={window} item={folders[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} focusWindow={focusWindow} modifyItem={modifyItem} />
      default:
        return '';
    }
  }

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { id, offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('Text'));
    this.props.moveWindow(id, e.pageX - offsetX, e.pageY - offsetY);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="main-view" onDrop={this.onDrop} onDragOver={this.onDragOver}>
        {this.props.windows_order.map(x => this.getWindow(x))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    graphics: state.folderReducer.graphics,
    audio: state.folderReducer.audio,
    functions: state.folderReducer.functions,
    objects: state.folderReducer.objects,
    scenes: state.folderReducer.scenes,
    folders: state.folderReducer.folders,
    animations: state.folderReducer.animations,
    windows: state.windowReducer.windows,
    windows_order: state.windowReducer.windows_order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeWindow: (id) => {
      dispatch(closeWindow(id));
    },
    moveWindow: (id, x, y) => {
      dispatch(moveWindow(id, x, y));
    },
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
    createAnimation: (id) => {
      dispatch(createAnimation(id));
    },
    deleteAnimation: (id) => {
      dispatch(deleteAnimation(id));
    },
    focusWindow: (id) => {
      dispatch(focusWindow(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
