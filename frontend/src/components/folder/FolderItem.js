import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FolderItem extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", this.props.item.id);
  }

  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onItemContextMenu(this.props.item.id, e.pageX, e.pageY);
  }

  onDoubleClick = (e) => {
    this.props.open(this.props.item.id);
  }

  render() {
    return (
      <div className="folder-item" onDragStart={this.onDragStart} draggable="true" onContextMenu={this.onContextMenu} onDoubleClick={this.onDoubleClick}>
        {this.props.item.name}
      </div>
    );
  }
}

FolderItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemContextMenu: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired
};

export default FolderItem
