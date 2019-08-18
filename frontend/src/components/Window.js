import React, { Component } from 'react';
import WindowBar from './WindowBar';

export class Window extends Component {
  render() {
    return (
      <div className="window" style={{ position: 'absolute', left: this.props.x, top: this.props.y }}>
        <WindowBar item={this.props.item} x={this.props.x} y={this.props.y} closeWindow={this.props.closeWindow} />
        <div className="window-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Window
