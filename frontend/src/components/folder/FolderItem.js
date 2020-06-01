import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../utils/getIcon";
import { openWindow } from "../../actions/windowActions";

export function FolderItem({ id, item, onItemContextMenu, openWindow }) {
  const onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", item.id);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onItemContextMenu(
      item.id,
      e.pageX || 0,
      e.pageY || 0,
    );
  };

  const onDoubleClick = (e) => {
    e.stopPropagation();
    openWindow(item.id);
  };

  return (
    <div
      className="folder-item"
      onDragStart={onDragStart}
      draggable="true"
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      <FontAwesomeIcon
        icon={getIcon(item.id)}
        className="folder-item-icon"
      />
      {item.name}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  return {
    item: state.folderReducer[itemType][ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openWindow: (id) => {
      dispatch(openWindow(id));
    },
  };
};

FolderItem.propTypes = {
  id: PropTypes.string.isRequired,
  onItemContextMenu: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderItem);
