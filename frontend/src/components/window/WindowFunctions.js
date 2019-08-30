import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';
import Editor from '../shared/Editor';
import ListDisplay from '../shared/ListDisplay';

export class WindowFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  selectArg = (e) => {
    this.setState({
      ...this.state,
      selected: e.target.value
    });
  }

  createArg = (e) => {
    const { item, modifyItem } = this.props;
    const newArgName = 'arg_' + item.args.length;
    modifyItem({
      ...item,
      args: [...item.args, newArgName]
    });
  }

  deleteArg = (e) => {
    const { item, modifyItem } = this.props;
    modifyItem({
      ...item,
      args: item.args.filter(x => x !== this.state.selected)
    });
    this.setState({
      ...this.state,
      selected: ''
    });
  }

  moveArgUp = (e) => {
    const { item, modifyItem } = this.props;
    const index = item.args.indexOf(this.state.selected);
    if(index === -1) {
      return;
    }
    const newArgs = [...item.args];
    if(index > 0) {
      [newArgs[index - 1], newArgs[index]] = [newArgs[index], newArgs[index - 1]];
    }
    modifyItem({
      ...item,
      args: newArgs
    });
  }

  moveArgDown = (e) => {
    const { item, modifyItem } = this.props;
    const index = item.args.indexOf(this.state.selected);
    if(index === -1) {
      return;
    }
    const newArgs = [...item.args];
    if(index < item.args.length - 1) {
      [newArgs[index], newArgs[index + 1]] = [newArgs[index + 1], newArgs[index]];
    }
    modifyItem({
      ...item,
      args: newArgs
    });
  }

  onArgNameChange = (e) => {
    const { item, modifyItem } = this.props;
    const newName = e.target.value;
    const index = item.args.indexOf(this.state.selected);
    const newArgs = [...item.args];
    newArgs[index] = newName;
    modifyItem({
      ...item,
      args: newArgs
    });
    this.setState({
      ...this.state,
      selected: newName
    });
  }

  render() {
    const { item, x, y, closeWindow, focusWindow, modifyItem, names } = this.props;
    return (
      <Window item={item} x={x} y={y} closeWindow={closeWindow} focusWindow={focusWindow} modifyItem={modifyItem} >
        <div className="function-panel">
          <div className="function-args">
            <ListDisplay name={'Arguments'} container={item.args} getName={(id) => id} onChange={this.selectArg} onButtonPlus={this.createArg} onButtonMinus={this.deleteArg} onButtonUp={this.moveArgUp} onButtonDown={this.moveArgDown} />
            {this.state.selected && <div>
              <div>Name:</div>
              <input type="text" value={this.state.selected} onChange={this.onArgNameChange}></input>
            </div>}
          </div>
          <Editor item={item} modifyItem={modifyItem} args={item.args} names={names} />
        </div>
      </Window>
    );
  }
}

WindowFunctions.propTypes = {
  item: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  closeWindow: PropTypes.func.isRequired,
  focusWindow: PropTypes.func.isRequired,
  modifyItem: PropTypes.func.isRequired,
  names: PropTypes.array.isRequired
}

export default WindowFunctions;
