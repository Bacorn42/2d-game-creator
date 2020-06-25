import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./WindowScenesObject.css";

export function WindowScenesObject({ left, top, animation, graphicsFilename }) {
  if (!animation) {
    return (
      <div
        className="scene-object scene-object-noanimation"
        style={{
          left: left + "px",
          top: top + "px",
        }}
      ></div>
    );
  }
  return (
    <div
      className="scene-object"
      style={{
        left: left + "px",
        top: top + "px",
        width: animation.tileWidth + "px",
        height: animation.tileHeight + "px",
        background: "url(img/" + graphicsFilename + ")",
        backgroundPosition:
          "top -" + animation.top + "px left -" + animation.left + "px",
      }}
    ></div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const items = state.folderReducer;
  const object = items.objects[ownProps.objectId];
  const animation = items.animations[object.animation];
  if (!animation) {
    return {};
  }
  return {
    animation,
    graphicsFilename: items.graphics[animation.parent].filename,
  };
};

WindowScenesObject.propTypes = {
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(WindowScenesObject);
