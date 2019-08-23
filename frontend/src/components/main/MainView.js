import React, { Component } from 'react';
import { connect } from 'react-redux';
import WindowGraphics from '../window/WindowGraphics';
import WindowAudio from '../window/WindowAudio';
import WindowFunctions from '../window/WindowFunctions';
import { closeWindow, moveWindow } from '../../actions/windowActions';
import { modifyItem, createAnimation, deleteAnimation } from '../../actions/folderActions';

export class MainView extends Component {
  getWindow = (window) => {
    const { graphics, audio, functions, animations, windows, closeWindow, modifyItem, createAnimation, deleteAnimation } = this.props;
    const type = window.split('_')[0];
    switch(type) {
      case 'graphics':
        return <WindowGraphics key={window} item={graphics[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} animations={animations} modifyItem={modifyItem} createAnimation={createAnimation} deleteAnimation={deleteAnimation} />
      case 'audio':
        return <WindowAudio key={window} item={audio[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} modifyItem={modifyItem} />
      case 'functions':
        return <WindowFunctions key={window} item={functions[window]} x={windows[window].x} y={windows[window].y} closeWindow={closeWindow} modifyItem={modifyItem} />
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
        {Object.keys(this.props.windows).map(x => this.getWindow(x))}
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
    animations: state.folderReducer.animations,
    windows: state.windowReducer.windows
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
