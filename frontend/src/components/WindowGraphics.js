import React, { Component } from 'react';
import Window from './Window';
import AnimationDisplay from './AnimationDisplay';

export class WindowGraphics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  onNameChange = (e) => {
    this.props.modifyItem({
      ...this.props.item,
      name: e.target.value
    });
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

  openAnimation = (e) => {
    this.setState({
      selected: e.target.value
    });
  }

  render() {
    const { item, x, y, closeWindow, animations, modifyItem } = this.props;
    return (
      <Window item={item} x={x} y={y} closeWindow={closeWindow} >
        {this.props.item.filename ? 
          <div>
            Name: <input type="text" value={item.name} onChange={this.onNameChange} ></input>
            <hr />
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  Animations<br />
                  { item.animations.length ?
                  <select multiple={true} onChange={this.openAnimation}>
                    {item.animations.map(x => <option key={x} value={x}>{animations[x].name}</option> )}
                  </select> :
                  'None'
                  }
                  <br />
                  <button onClick={this.createAnimation}>+</button>
                </div>
                <div style={{ borderLeft: '1px solid gray' }}>
                  { this.state.selected && <AnimationDisplay animation={animations[this.state.selected]} modifyItem={modifyItem} /> }
                </div>
              </div>
              <hr />
              <div style={{ position: 'relative' }}>
                <img src={'img/' + item.filename} alt={item.name}></img>
                {this.state.selected && <div style={{ position: 'absolute', top: animations[this.state.selected].top, left: animations[this.state.selected].left, width: animations[this.state.selected].width, height: animations[this.state.selected].height, border: '1px solid black', background: 'rgba(0,0,0,0.5)' }} ></div>}
              </div>
            </div> 
          </div> : 
          <div>
            Please select image file to be used for this graphic:<br />
            <input type="file" onChange={this.onUploadGraphic}></input>
          </div>
        }
      </Window>
    )
  }
}

export default WindowGraphics
