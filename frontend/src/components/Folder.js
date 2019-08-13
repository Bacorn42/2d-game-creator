import React, { Component } from 'react';
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
    return (
      <div style={{ marginLeft: 20 }} className="folder" onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} draggable="true" onContextMenu={this.onContextMenu}>
        {this.props.folder.name}
        {this.props.folder.folders.map(x => <Folder key={x} folders={this.props.folders} folder={this.props.folders[x]} items={this.props.items} drop={this.props.drop} onFolderContextMenu={this.props.onFolderContextMenu} onItemContextMenu={this.props.onItemContextMenu} />)}
        {this.props.folder.items.map(x => <FolderItem key={x} item={this.props.items[x]} onItemContextMenu={this.props.onItemContextMenu} />)}
      </div>
    )
  }
}

export default Folder;
