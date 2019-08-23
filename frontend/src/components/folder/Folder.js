import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FolderItem from './FolderItem';

export class Folder extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", this.props.folder.id);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData('Text');
    
    this.props.drop(id, this.props.folder.id);
  }

  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onFolderContextMenu(this.props.folder.id, e.pageX, e.pageY);
  }
  
  render() {
    const { folder, folders, items, drop, onFolderContextMenu, onItemContextMenu, open } = this.props;
    return (
      <div className="folder" onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} draggable="true" onContextMenu={this.onContextMenu}>
        {folder.name}
        {folder.folders.map(x => <Folder key={x} folders={folders} folder={folders[x]} items={items} drop={drop} onFolderContextMenu={onFolderContextMenu} onItemContextMenu={onItemContextMenu} open={open} />)}
        {folder.items.map(x => <FolderItem key={x} item={items[x]} onItemContextMenu={onItemContextMenu} open={open} />)}
      </div>
    );
  }
}

Folder.propTypes = {
  folders: PropTypes.object.isRequired,
  folder: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  drop: PropTypes.func.isRequired,
  onFolderContextMenu: PropTypes.func.isRequired,
  onItemContextMenu: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired
};

export default Folder;
