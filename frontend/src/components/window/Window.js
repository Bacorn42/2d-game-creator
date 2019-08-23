import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    );
  }
}

Window.propTypes = {
  item: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  closeWindow: PropTypes.func.isRequired,
  modifyItem: PropTypes.func.isRequired
}


export default Window;
