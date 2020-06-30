import React from "react";
import PropTypes from "prop-types";

export function ItemContextMenu({ itemMenuItems, x, y }) {
  return (
    <div className="item-context-menu" style={{ left: x, top: y }}>
      {itemMenuItems.map((menuItem) =>
        <div
          key={menuItem.label}
          className="item-context-menu-item"
          onClick={menuItem.callback}
        >
          {menuItem.label}
        </div>
      )}
    </div>
  );
}

ItemContextMenu.propTypes = {
  itemMenuItems: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default ItemContextMenu;
