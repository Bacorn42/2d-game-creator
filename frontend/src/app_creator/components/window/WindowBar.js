import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../utils/getIcon";
import { closeWindow } from "../../actions/windowActions";
import getWindowName from "../../utils/getWindowName";

export function WindowBar({
  id,
  name,
  window,
  closeWindow,
  maximized,
  changeMaximize,
}) {
  const onDragStart = (e) => {
    if (maximized) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    e.dataTransfer.setData(
      "Text",
      JSON.stringify({
        id: id,
        offsetX: e.pageX - window.x,
        offsetY: e.pageY - window.y,
      })
    );
  };

  const onClick = (e) => {
    e.stopPropagation();
    closeWindow(id);
  };

  return (
    <div className="window-bar" draggable="true" onDragStart={onDragStart}>
      <div className="window-bar-title">
        <FontAwesomeIcon icon={getIcon(id)} className="window-bar-title-icon" />
        <div>{name}</div>
      </div>
      <div className="window-bar-icons">
        <FontAwesomeIcon
          icon={maximized ? "window-restore" : "window-maximize"}
          size="lg"
          className="window-bar-maximize"
          onClick={changeMaximize}
        />
        <FontAwesomeIcon
          icon="window-close"
          size="lg"
          className="window-bar-close"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: getWindowName(state.folderReducer, ownProps.id),
    window: state.windowReducer.windows[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeWindow: (id) => {
      dispatch(closeWindow(id));
    },
  };
};

WindowBar.propTypes = {
  id: PropTypes.string.isRequired,
  maximized: PropTypes.bool.isRequired,
  changeMaximize: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowBar);
