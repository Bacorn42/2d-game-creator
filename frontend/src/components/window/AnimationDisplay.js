import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { modifyItem } from "../../actions/folderActions";

export function AnimationDisplay({ animation, modifyItem }) {
  const onNameChange = (e) => {
    modifyItem({
      ...animation,
      name: e.target.value,
    });
  };

  const changeTop = (e) => {
    modifyItem({
      ...animation,
      top: Number(e.target.value),
    });
  };

  const changeLeft = (e) => {
    modifyItem({
      ...animation,
      left: Number(e.target.value),
    });
  };

  const changeWidth = (e) => {
    modifyItem({
      ...animation,
      width: Number(e.target.value),
    });
  };

  const changeHeight = (e) => {
    modifyItem({
      ...animation,
      height: Number(e.target.value),
    });
  };

  const changeTileWidth = (e) => {
    modifyItem({
      ...animation,
      tileWidth: Number(e.target.value),
    });
  };

  const changeTileHeight = (e) => {
    modifyItem({
      ...animation,
      tileHeight: Number(e.target.value),
    });
  };

  const changeEvery = (e) => {
    modifyItem({
      ...animation,
      every: Number(e.target.value),
    });
  };

  const getCounterColor = (frames) => {
    if (frames - Math.floor(frames) !== 0 || frames <= 0) {
      return "red";
    }
    return "black";
  };

  const frames =
    (animation.width * animation.height) /
    (animation.tileWidth * animation.tileHeight);
  return (
    <div>
      Name:
      <input type="text" value={animation.name} onChange={onNameChange}></input>
      <hr />
      <div className="animation-label">
        Top
        <input type="text" value={animation.top} onChange={changeTop}></input>
      </div>
      <div className="animation-label">
        Left
        <input type="text" value={animation.left} onChange={changeLeft}></input>
      </div>
      <div className="animation-label">
        Width
        <input
          type="text"
          value={animation.width}
          onChange={changeWidth}
        ></input>
      </div>
      <div className="animation-label">
        Height
        <input
          type="text"
          value={animation.height}
          onChange={changeHeight}
        ></input>
      </div>
      <div className="animation-label">
        Tile Width
        <input
          type="text"
          value={animation.tileWidth}
          onChange={changeTileWidth}
        ></input>
      </div>
      <div className="animation-label">
        Tile Height
        <input
          type="text"
          value={animation.tileHeight}
          onChange={changeTileHeight}
        ></input>
      </div>
      <div className="animation-label">
        Update every
        <input
          type="text"
          value={animation.every}
          onChange={changeEvery}
        ></input>
      </div>
      <hr />
      <div style={{ color: getCounterColor(frames) }}>
        Number of frames: {frames}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    animation: state.folderReducer.animations[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
  };
};

AnimationDisplay.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimationDisplay);
