import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';
import Editor from './Editor';

export class WindowFunctions extends Component {
  render() {
    const { item, x, y, closeWindow, modifyItem } = this.props;
    return (
      <Window item={item} x={x} y={y} closeWindow={closeWindow} modifyItem={modifyItem} >
        <Editor item={item} modifyItem={modifyItem} />
      </Window>
    );
  }
}

WindowFunctions.propTypes = {
  item: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  closeWindow: PropTypes.func.isRequired,
  modifyItem: PropTypes.func.isRequired
}

export default WindowFunctions;
