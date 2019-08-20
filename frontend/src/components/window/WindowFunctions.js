import React, { Component } from 'react';
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

export default WindowFunctions;
