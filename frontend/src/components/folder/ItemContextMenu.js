import React, { Component } from 'react'

export class ItemContextMenu extends Component {
  render() {
    return (
      <div className="item-context-menu" style={{ position: 'absolute', left: this.props.x, top: this.props.y }}>
        {this.props.itemMenu.map(x => <div key={x.label} className="item-context-menu-item" onClick={x.callback}>{x.label}</div>)}
      </div>
    )
  }
}

export default ItemContextMenu
