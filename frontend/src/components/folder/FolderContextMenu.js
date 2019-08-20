import React, { Component } from 'react'

export class FolderContextMenu extends Component {
  render() {
    return (
      <div className="folder-context-menu" style={{ position: 'absolute', left: this.props.x, top: this.props.y }}>
        {this.props.folderMenu.map(x => <div key={x.label} className="folder-context-menu-item" onClick={x.callback}>{x.label}</div>)}
      </div>
    )
  }
}

export default FolderContextMenu
