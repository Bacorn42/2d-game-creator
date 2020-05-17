import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../utils/getIcon";

export class FolderItem extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", this.props.item.id);
  };

  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onItemContextMenu(
      this.props.item.id,
      e.pageX || 0,
      e.pageY || 0
    );
  };

  onDoubleClick = (e) => {
    e.stopPropagation();
    this.props.open(this.props.item.id);
  };

  render() {
    return (
      <div
        className="folder-item"
        onDragStart={this.onDragStart}
        draggable="true"
        onContextMenu={this.onContextMenu}
        onDoubleClick={this.onDoubleClick}
      >
        <FontAwesomeIcon
          icon={getIcon(this.props.item.id)}
          className="folder-item-icon"
        />
        {this.props.item.name}
      </div>
    );
  }
}

FolderItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemContextMenu: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default FolderItem;
