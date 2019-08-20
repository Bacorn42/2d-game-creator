import React, { Component } from 'react';
import { connect } from 'react-redux';
import WindowGraphics from '../window/WindowGraphics';
import { closeWindow, moveWindow } from '../../actions/windowActions';
import { modifyItem, createAnimation, deleteAnimation } from '../../actions/folderActions';

export class MainView extends Component {
  getWindow = (window) => {
    const type = window.split('_')[0];
    switch(type) {
      case 'graphics':
        return <WindowGraphics key={window} item={this.props.graphics[window]} x={this.props.windows[window].x} y={this.props.windows[window].y} closeWindow={this.props.closeWindow} animations={this.props.animations} modifyItem={this.props.modifyItem} createAnimation={this.props.createAnimation} deleteAnimation={this.props.deleteAnimation} />
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
