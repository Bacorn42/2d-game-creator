import React, { Component } from 'react';
import WindowBar from './WindowBar';

export class Window extends Component {
  onNameChange = (e) => {
    this.props.modifyItem({
      ...this.props.item,
      name: e.target.value
    });
  }

  render() {
    const { item, x, y, closeWindow } = this.props;
    return (
      <div className="window" style={{ left: x, top: y }}>
        <WindowBar item={item} x={x} y={y} closeWindow={closeWindow} />
        <div className="window-content">
          Name: <input type="text" value={item.name} onChange={this.onNameChange} ></input>
          <hr />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Window
