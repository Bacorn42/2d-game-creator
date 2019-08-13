import React, { Component } from 'react';

export class FolderItem extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", this.props.item.id);
  }

  render() {
    return (
      <div style={{ marginLeft: 20 }} className="folder-item" onDragStart={this.onDragStart} draggable="true">
        {this.props.item.name}
      </div>
    )
  }
}

export default FolderItem
