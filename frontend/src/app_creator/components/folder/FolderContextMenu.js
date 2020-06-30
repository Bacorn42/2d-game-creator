import React from "react";
import PropTypes from "prop-types";

export function FolderContextMenu({ folderMenuItems, x, y }) {
  return (
    <div className="folder-context-menu" style={{ left: x, top: y }}>
      {folderMenuItems.map((menuItem) =>
        <div
          key={menuItem.label}
          className="folder-context-menu-item"
          onClick={menuItem.callback}
        >
          {menuItem.label}
        </div>
      )}
    </div>
  );
}

FolderContextMenu.propTypes = {
  folderMenuItems: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default FolderContextMenu;
