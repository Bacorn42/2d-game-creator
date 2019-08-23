import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WindowBar extends Component {
  onDragStart = (e) => {
    if(this.props.maximized) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    e.dataTransfer.setData("Text", JSON.stringify({
      id: this.props.item.id,
      offsetX: e.pageX - this.props.x,
      offsetY: e.pageY - this.props.y
    }));
  }

  onClick = (e) => {
    e.stopPropagation();
    this.props.closeWindow(this.props.item.id);
  }

  render() {
    return (
      <div className="window-bar" draggable="true" onDragStart={this.onDragStart}>
        <div>{this.props.item.name}</div>
        <div className="window-bar-icons">
          <div className="window-bar-maximize" onClick={this.props.changeMaximize}>{ this.props.maximized ? '↙' : '↗'}</div>
          <div className="window-bar-close" onClick={this.onClick}>&times;</div>
        </div>
      </div>
    );
  }
}

WindowBar.propTypes = {
  item: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  closeWindow: PropTypes.func.isRequired,
  maximized: PropTypes.bool.isRequired,
  changeMaximize: PropTypes.func.isRequired
}

export default WindowBar;
