import React, { Component } from 'react';
import Window from './Window';

export class WindowGraphics extends Component {
  render() {
    return (
      <Window item={this.props.item} x={this.props.x} y={this.props.y} closeWindow={this.props.closeWindow} >
        <div>
          <p>This is a graphics window.</p>
          <p>Id: {this.props.item.id}</p>
          <p>Name: {this.props.item.name}</p>
          <p>In folder: {this.props.item.parent}</p>
          <p>Amount of animations: {this.props.item.animations.length}</p>
        </div>
      </Window>
    )
  }
}

export default WindowGraphics
