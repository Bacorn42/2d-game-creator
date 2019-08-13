import React, { Component } from 'react';
import { connect } from 'react-redux';
import Folder from './Folder';
import { moveItem, moveFolder } from '../actions/dndFolderActions';

export class FolderView extends Component {
  drop = (id, to) => {
    const type = id.split('_')[0];
    type === 'folder' ?
      this.props.moveFolder(id, to) :
      this.props.moveItem(id, to);
  }

  render() {
    return (
      <div className="folder-view">
        {this.props.folderRoot.map(x => <Folder key={x} folders={this.props.folders} folder={this.props.folders[x]} items={this.props[x.split('_')[1]]} drop={this.drop} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    graphics: state.graphics,
    audio: state.audio,
    functions: state.functions,
    objects: state.objects,
    scenes: state.scenes,
    folders: state.folders,
    folderRoot: state.folderRoot
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveItem: (id, to) => {
      dispatch(moveItem(id, to));
    },
    moveFolder: (id, to) => {
      dispatch(moveFolder(id, to));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderView)
