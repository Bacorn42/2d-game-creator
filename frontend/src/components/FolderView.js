import React, { Component } from 'react';
import { connect } from 'react-redux';
import Folder from './Folder';
import { moveItem, moveFolder, createFolder, deleteFolder, createItem, deleteItem } from '../actions/folderActions';
import FolderContextMenu from './FolderContextMenu';
import ItemContextMenu from './ItemContextMenu';
import { openWindow } from '../actions/windowActions';

export class FolderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderMenu: {
         items : [
          {
            label: 'Create Folder',
            callback: () => this.props.createFolder(this.state.folderMenu.id)
          },
          {
            label: 'Create Item',
            callback: () => this.props.createItem(this.state.folderMenu.id)
          },
          {
            label: 'Delete Folder',
            callback: () => this.props.deleteFolder(this.state.folderMenu.id)
          }
        ],
        visible: false,
        x: 0,
        y: 0,
        id: null
      },
      itemMenu: {
        items : [
         {
           label: 'Open Item',
           callback: () => this.props.openWindow(this.state.itemMenu.id)
         },
         {
           label: 'Delete Item',
           callback: () => this.props.deleteItem(this.state.itemMenu.id)
         }
       ],
       visible: false,
       x: 0,
       y: 0,
       id: null
     }
    };
  }

  onFolderContextMenu = (id, x, y) => {
    this.setState({
      folderMenu: {
        ...this.state.folderMenu,
        visible: true,
        x,
        y,
        id
      },
      itemMenu: {
        ...this.state.itemMenu,
        visible: false
      }
    })
  }

  onItemContextMenu = (id, x, y) => {
    this.setState({
      folderMenu: {
        ...this.state.folderMenu,
        visible: false
      },
      itemMenu: {
        ...this.state.itemMenu,
        visible: true,
        x,
        y,
        id
      }
    })
  }

  drop = (id, to) => {
    const type = id.split('_')[0];
    type === 'folder' ?
      this.props.moveFolder(id, to) :
      this.props.moveItem(id, to);
  }

  onClick = (e) => {
    this.setState({
      folderMenu: {
        ...this.state.folderMenu,
        visible: false
      },
      itemMenu: {
        ...this.state.itemMenu,
        visible: false
      }
    });
  }

  render() {
    return (
      <div className="folder-view" onClick={this.onClick}>
        {this.props.folderRoot.map(x => <Folder key={x} folders={this.props.folders} folder={this.props.folders[x]} items={this.props[x.split('_')[1]]} drop={this.drop} onFolderContextMenu={this.onFolderContextMenu} onItemContextMenu={this.onItemContextMenu} open={this.props.openWindow} />)}
        { this.state.folderMenu.visible && <FolderContextMenu folderMenu={this.state.folderMenu.items} x={this.state.folderMenu.x} y={this.state.folderMenu.y} /> }
        { this.state.itemMenu.visible && <ItemContextMenu itemMenu={this.state.itemMenu.items} x={this.state.itemMenu.x} y={this.state.itemMenu.y} /> }
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
    folderRoot: state.folderReducer.folderRoot
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveItem: (id, to) => {
      dispatch(moveItem(id, to));
    },
    moveFolder: (id, to) => {
      dispatch(moveFolder(id, to));
    },
    createFolder: (id) => {
      dispatch(createFolder(id));
    },
    deleteFolder: (id) => {
      dispatch(deleteFolder(id));
    },
    createItem: (id) => {
      dispatch(createItem(id));
    },
    deleteItem: (id) => {
      dispatch(deleteItem(id));
    },
    openWindow: (id) => {
      dispatch(openWindow(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderView)
