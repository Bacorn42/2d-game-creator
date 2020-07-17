import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import WindowBar from "./WindowBar";
import { modifyItem } from "../../actions/folderActions";
import { focusWindow } from "../../actions/windowActions";
import "./Window.css";

export function Window({
  id,
  item,
  window,
  modifyItem,
  focusWindow,
  children,
}) {
  const [maximized, setMaximized] = useState(false);

  const onNameChange = (e) => {
    modifyItem({
      ...item,
      name: e.target.value,
    });
  };

  const changeMaximize = (e) => {
    setMaximized(!maximized);
  };

  const onClick = (e) => {
    const windowId = item?.id || id;
    focusWindow(windowId);
  };

  return (
    <div
      className={"window " + (maximized ? "window-maximized" : "")}
      style={{ left: window.x, top: window.y }}
      onClick={onClick}
    >
      <WindowBar
        id={id}
        maximized={maximized}
        changeMaximize={changeMaximize}
      />
      <div className="window-content">
        {item && (
          <>
            Name:{" "}
            <input
              type="text"
              value={item.name}
              onChange={onNameChange}
            ></input>
            <hr />
          </>
        )}
        {children}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  return {
    item: state.folderReducer[itemType]?.[ownProps.id],
    window: state.windowReducer.windows[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
    focusWindow: (id) => {
      dispatch(focusWindow(id));
    },
  };
};

Window.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);
