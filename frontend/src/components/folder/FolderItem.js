import React, { Component } from 'react';

export class FolderItem extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", this.props.item.id);
  }

  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onItemContextMenu(this.props.item.id, e.pageX, e.pageY);
  }

  onDoubleClick = (e) => {
    this.props.open(this.props.item.id);
  }

  render() {
    return (
      <div style={{ marginLeft: 20 }} className="folder-item" onDragStart={this.onDragStart} draggable="true" onContextMenu={this.onContextMenu} onDoubleClick={this.onDoubleClick}>
        {this.props.item.name}
      </div>
    )
  }
}

export default FolderItem