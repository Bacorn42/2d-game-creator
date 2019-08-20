import React, { Component } from 'react';
import Window from './Window';

export class WindowAudio extends Component {
  onUploadAudio = (e) => {
    const filename = e.target.value.split('\\');
    this.props.modifyItem({
      ...this.props.item,
      filename: filename[filename.length - 1]
    });
  }

  fileAvailable = () => {
    return (
      <div>
        <div>
          Your currently used audio:
        </div>
        <audio controls={true} src={'snd/' + this.props.item.filename} ></audio>
      </div>
    )
  }

  fileNotAvailable = () => {
    return (
      <div>
        <div>Please select audio file to be used:</div>
        <input type="file" onChange={this.onUploadAudio}></input>
      </div>
    );
  }

  render() {
    const { item, x, y, closeWindow, modifyItem } = this.props;
    return (
      <Window item={item} x={x} y={y} closeWindow={closeWindow} modifyItem={modifyItem} >
        {item.filename ? this.fileAvailable() : this.fileNotAvailable()}
      </Window>
    )
  }
}

export default WindowAudio;