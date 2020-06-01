import React, { useState } from "react";
import { connect } from "react-redux";
import Folder from "../folder/Folder";
import {
  moveItem,
  moveFolder,
  createFolder,
  deleteFolder,
  createItem,
  deleteItem,
} from "../../actions/folderActions";
import FolderContextMenu from "../folder/FolderContextMenu";
import ItemContextMenu from "../folder/ItemContextMenu";
import { openWindow } from "../../actions/windowActions";
import "./FolderView.css";

export function FolderView(
  {
    moveItem,
    moveFolder,
    createFolder,
    deleteFolder,
    createItem,
    deleteItem,
    openWindow,
    folderRoot,
  },
) {
  const [folderMenu, setFolderMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    id: null,
  });
  const [itemMenu, setItemMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    id: null,
  });
  const folderMenuItems = [
    {
      label: "Create Folder",
      callback: () => createFolder(folderMenu.id),
    },
    {
      label: "Create Item",
      callback: () => createItem(folderMenu.id),
    },
    {
      label: "Rename Folder",
      callback: () => {
        if (!folderRoot.includes(folderMenu.id)) {
          openWindow(folderMenu.id);
        }
      },
    },
    {
      label: "Delete Folder",
      callback: () => deleteFolder(folderMenu.id),
    },
  ];
  const itemMenuItems = [
    {
      label: "Open Item",
      callback: () => openWindow(itemMenu.id),
    },
    {
      label: "Delete Item",
      callback: () => deleteItem(itemMenu.id),
    },
  ];

  const onFolderContextMenu = (id, x, y) => {
    setFolderMenu({
      visible: true,
      x,
      y,
      id,
    });
    setItemMenu({
      ...itemMenu,
      visible: false,
    });
  };

  const onItemContextMenu = (id, x, y) => {
    setFolderMenu({
      ...folderMenu,
      visible: false,
    });
    setItemMenu({
      visible: true,
      x,
      y,
      id,
    });
  };

  const drop = (id, to) => {
    const type = id.split("_")[0];
    type === "folders" ? moveFolder(id, to) : moveItem(id, to);
  };

  const onClick = (e) => {
    setFolderMenu({
      ...folderMenu,
      visible: false,
    });
    setItemMenu({
      ...itemMenu,
      visible: false,
    });
  };

  return (
    <div className="folder-view" onClick={onClick}>
      {folderRoot.map((x) => (
        <Folder
          key={x}
          id={x}
          isRenameable={false}
          drop={drop}
          onFolderContextMenu={onFolderContextMenu}
          onItemContextMenu={onItemContextMenu}
        />
      ))}
      {folderMenu.visible && (
        <FolderContextMenu
          folderMenuItems={folderMenuItems}
          x={folderMenu.x}
          y={folderMenu.y}
        />
      )}
      {itemMenu.visible && (
        <ItemContextMenu
          itemMenuItems={itemMenuItems}
          x={itemMenu.x}
          y={itemMenu.y}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    folderRoot: state.folderReducer.folderRoot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moveItem: (id, to) => {
      dispatch(moveItem(id, to));
    },
    moveFolder: (id, to) => {
      dispatch(moveFolder(id, to));
    },
    createFolder: (id) => {
      dispatch(createFolder(id));
    },
    deleteFolder: (id) => {
      dispatch(deleteFolder(id));
    },
    createItem: (id) => {
      dispatch(createItem(id));
    },
    deleteItem: (id) => {
      dispatch(deleteItem(id));
    },
    openWindow: (id) => {
      dispatch(openWindow(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderView);
