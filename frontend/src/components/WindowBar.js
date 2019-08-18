import React, { Component } from 'react';

export class WindowBar extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", JSON.stringify({
      id: this.props.item.id,
      offsetX: e.pageX - this.props.x,
      offsetY: e.pageY - this.props.y
    }));
  }

  onClick = (e) => {
    this.props.closeWindow(this.props.item.id);
  }

  render() {
    return (
      <div className="window-bar" draggable="true" onDragStart={this.onDragStart}>
        <div>{this.props.item.name}</div>
        <div className="window-bar-close" onClick={this.onClick}>&times;</div>
      </div>
    )
  }
}

export default WindowBar
