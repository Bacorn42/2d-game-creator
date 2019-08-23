import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowBar from './WindowBar';

export class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maximized: false
    };
  }

  onNameChange = (e) => {
    this.props.modifyItem({
      ...this.props.item,
      name: e.target.value
    });
  }

  changeMaximize = (e) => {
    this.setState({
      maximized: !this.state.maximized
    });
  }

  onClick = (e) => {
    this.props.focusWindow(this.props.item.id);
  }

  render() {
    const { item, x, y, closeWindow } = this.props;
    return (
      <div className={'window ' + (this.state.maximized ? 'window-maximized' : '')} style={{ left: x, top: y }} onClick={this.onClick}>
        <WindowBar item={item} x={x} y={y} closeWindow={closeWindow} maximized={this.state.maximized} changeMaximize={this.changeMaximize} />
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
  focusWindow: PropTypes.func.isRequired,
  modifyItem: PropTypes.func.isRequired
}


export default Window;
