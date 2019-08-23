import React from 'react';
import PropTypes from 'prop-types';

export function FolderContextMenu({ folderMenu, x, y }) {
  return (
    <div className="folder-context-menu" style={{ left: x, top: y }}>
      {folderMenu.map(menuItem => <div key={menuItem.label} className="folder-context-menu-item" onClick={menuItem.callback}>{menuItem.label}</div>)}
    </div>
  );
}

FolderContextMenu.propTypes = {
  folderMenu: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default FolderContextMenu;
