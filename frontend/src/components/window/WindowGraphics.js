import React, { Component } from 'react';
import Window from './Window';
import AnimationDisplay from './AnimationDisplay';
import AnimationList from './AnimationList';

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
            Animations<br />
            <button onClick={this.createAnimation}>+</button>
            <button onClick={this.deleteAnimation}>-</button>
            <AnimationList item={item} animations={animations} openAnimation={this.openAnimation} />
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
    const { item, x, y, closeWindow, modifyItem } = this.props;
    return (
      <Window item={item} x={x} y={y} closeWindow={closeWindow} modifyItem={modifyItem} >
        <hr />
        {item.filename ? this.fileAvailable() : this.fileNotAvailable()}
      </Window>
    )
  }
}

export default WindowGraphics
