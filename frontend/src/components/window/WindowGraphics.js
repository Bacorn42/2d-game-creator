import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';
import AnimationDisplay from './AnimationDisplay';
import ListDisplay from '../shared/ListDisplay';

export class WindowGraphics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  onUploadGraphic = (e) => {
    const filename = e.target.value.split('\\');
    this.props.modifyItem({
      ...this.props.item,
      filename: filename[filename.length - 1]
    });
  }

  createAnimation = (e) => {
    this.props.createAnimation(this.props.item.id);
  }

  deleteAnimation = (e) => {
    if(this.state.selected !== '') {
      this.props.deleteAnimation(this.state.selected);
      this.setState({
        selected: ''
      });
    }
  }

  openAnimation = (e) => {
    this.setState({
      selected: e.target.value
    });
  }

  moveAnimationUp = (e) => {
    const { item, modifyItem } = this.props;
    const index = item.animations.indexOf(this.state.selected);
    if(index === -1) {
      return;
    }
    const newAnimations = [...item.animations];
    if(index > 0) {
      [newAnimations[index - 1], newAnimations[index]] = [newAnimations[index], newAnimations[index - 1]];
    }
    modifyItem({
      ...item,
      animations: newAnimations
    });
  }

  moveAnimationDown = (e) => {
    const { item, modifyItem } = this.props;
    const index = item.animations.indexOf(this.state.selected);
    if(index === -1) {
      return;
    }
    const newAnimations = [...item.animations];
    if(index < item.animations.length - 1) {
      [newAnimations[index], newAnimations[index + 1]] = [newAnimations[index + 1], newAnimations[index]];
    }
    modifyItem({
      ...item,
      animations: newAnimations
    });
  }

  getAnimationName = (id) => {
    return this.props.animations[id].name;
  }

  getSelectedAnimation = () => {
    if(this.state.selected === '') {
      return null;
    }
    const animation = this.props.animations[this.state.selected];
    return <div className="animation-selection" style={{ top: animation.top, left: animation.left, width: animation.width, height: animation.height }} ></div>
  }

  fileAvailable = () => {
    const { item, animations, modifyItem } = this.props;
    return (
      <div>
        <div className="animation-panel">
          <div className="animation-manager">
            <ListDisplay name={'Animations'} container={item.animations} getName={this.getAnimationName} onChange={this.openAnimation} onButtonPlus={this.createAnimation} onButtonMinus={this.deleteAnimation} onButtonUp={this.moveAnimationUp} onButtonDown={this.moveAnimationDown} />
          </div>
          <div className="animation-display">
            {this.state.selected && <AnimationDisplay animation={animations[this.state.selected]} modifyItem={modifyItem} />}
          </div>
        </div>
        <hr />
        <div style={{ position: 'relative' }}>
          <img src={'img/' + item.filename} alt={item.name}></img>
          {this.getSelectedAnimation()}
        </div>
      </div> 
    );
  }

  fileNotAvailable = () => {
    return (
      <div>
        <div>Please select image file to be used for this graphic:</div>
        <input type="file" onChange={this.onUploadGraphic}></input>
      </div>
    );
  }

  render() {
    const { item, x, y, closeWindow, focusWindow, modifyItem } = this.props;
    return (
      <Window item={item} x={x} y={y} closeWindow={closeWindow} focusWindow={focusWindow} modifyItem={modifyItem} >
        {item.filename ? this.fileAvailable() : this.fileNotAvailable()}
      </Window>
    );
  }
}

WindowGraphics.propTypes = {
  item: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  closeWindow: PropTypes.func.isRequired,
  focusWindow: PropTypes.func.isRequired,
  animations: PropTypes.object.isRequired,
  modifyItem: PropTypes.func.isRequired,
  createAnimation: PropTypes.func.isRequired,
  deleteAnimation: PropTypes.func.isRequired
}

export default WindowGraphics;
