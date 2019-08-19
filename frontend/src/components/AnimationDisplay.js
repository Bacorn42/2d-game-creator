import React, { Component } from 'react';

export class AnimationDisplay extends Component {
  onNameChange = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      name: e.target.value
    });
  }

  changeTop = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      top: Number(e.target.value)
    });
  }

  changeLeft = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      left: Number(e.target.value)
    });
  }

  changeWidth = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      width: Number(e.target.value)
    });
  }

  changeHeight = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      height: Number(e.target.value)
    });
  }

  changeTileWidth = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      tileWidth: Number(e.target.value)
    });
  }

  changeTileHeight = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      tileHeight: Number(e.target.value)
    });
  }

  changeEvery = (e) => {
    this.props.modifyItem({
      ...this.props.animation,
      every: Number(e.target.value)
    });
  }

  render() {
    const frames = (this.props.animation.width * this.props.animation.height)/(this.props.animation.tileWidth * this.props.animation.tileHeight);
    return (
      <div>
         Name: <input type="text" value={this.props.animation.name} onChange={this.onNameChange} ></input>
         <hr />
         Top: <input type="text" value={this.props.animation.top} onChange={this.changeTop}></input><br />
         Left: <input type="text" value={this.props.animation.left} onChange={this.changeLeft}></input><br />
         Width: <input type="text" value={this.props.animation.width} onChange={this.changeWidth}></input><br />
         Height: <input type="text" value={this.props.animation.height} onChange={this.changeHeight}></input><br />
         Tile Width: <input type="text" value={this.props.animation.tileWidth} onChange={this.changeTileWidth}></input><br />
         Tile Height: <input type="text" value={this.props.animation.tileHeight} onChange={this.changeTileHeight}></input><br />
         Update every: <input type="text" value={this.props.animation.every} onChange={this.changeEvery}></input>
         <hr />
         <div style={{ color: ((frames - Math.floor(frames) !== 0) || frames <= 0) ? 'red' : 'black' }}> Number of frames: {frames} </div>
      </div>
    )
  }
}

export default AnimationDisplay;
