import React from 'react';
import PropTypes from 'prop-types';

export function ItemContextMenu({ itemMenu, x, y }) {
  return (
    <div className="item-context-menu" style={{ position: 'absolute', left: x, top: y }}>
      {itemMenu.map(menuItem => <div key={menuItem.label} className="item-context-menu-item" onClick={menuItem.callback}>{menuItem.label}</div>)}
    </div>
  );
}

ItemContextMenu.propTypes = {
  itemMenu: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default ItemContextMenu;
