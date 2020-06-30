import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FolderItem from "./FolderItem";
import { modifyItem } from "../../actions/folderActions";
import { openWindow } from "../../actions/windowActions";

export function Folder(
  {
    folder,
    isRenameable,
    drop,
    onFolderContextMenu,
    onItemContextMenu,
    modifyItem,
    openWindow,
  },
) {
  const onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", folder.id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData("Text");

    drop(id, folder.id);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFolderContextMenu(
      folder.id,
      e.pageX || 0,
      e.pageY || 0,
    );
  };

  const onDoubleClick = (e) => {
    e.stopPropagation();
    if (isRenameable) {
      openWindow(folder.id);
    }
  };

  const changeExpansion = (e) => {
    modifyItem({
      ...folder,
      expanded: !folder.expanded,
    });
  };

  const expanded = () => {
    return (
      <div>
        {folder.folders.map((x) => (
          <ConnectedFolder
            key={x}
            id={x}
            isRenameable={true}
            drop={drop}
            onFolderContextMenu={onFolderContextMenu}
            onItemContextMenu={onItemContextMenu}
          />
        ))}
        {folder.items.map((x) => (
          <FolderItem
            key={x}
            id={x}
            onItemContextMenu={onItemContextMenu}
          />
        ))}
      </div>
    );
  };

  const folderExpansion = folder.expanded ? "angle-down" : "angle-right";
  return (
    <div
      className="folder"
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable="true"
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      <FontAwesomeIcon
        icon={folderExpansion}
        className="folder-expansion-icon"
        onClick={changeExpansion}
      />
      <FontAwesomeIcon icon="folder" className="folder-icon" />
      {folder.name}
      {folder.expanded && expanded()}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    folder: state.folderReducer.folders[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openWindow: (id) => {
      dispatch(openWindow(id));
    },
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
  };
};

Folder.propTypes = {
  id: PropTypes.string.isRequired,
  isRenameable: PropTypes.bool.isRequired,
  drop: PropTypes.func.isRequired,
  onFolderContextMenu: PropTypes.func.isRequired,
  onItemContextMenu: PropTypes.func.isRequired,
};

const ConnectedFolder = connect(mapStateToProps, mapDispatchToProps)(Folder);

export default ConnectedFolder;
