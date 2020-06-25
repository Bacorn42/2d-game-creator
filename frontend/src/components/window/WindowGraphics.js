import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Window from "./Window";
import AnimationDisplay from "./AnimationDisplay";
import ListDisplay from "../shared/ListDisplay";
import {
  modifyItem,
  createAnimation,
  deleteAnimation,
} from "../../actions/folderActions";
import "./WindowGraphics.css";

export function WindowGraphics({
  id,
  item,
  animations,
  modifyItem,
  createAnimation,
  deleteAnimation,
}) {
  const [selected, setSelected] = useState("");

  const onUploadGraphic = (e) => {
    const filename = e.target.value.split("\\");
    modifyItem({
      ...item,
      filename: filename[filename.length - 1],
    });
  };

  const createAnimationHandler = (e) => {
    createAnimation(item.id);
  };

  const deleteAnimationHandler = (e) => {
    if (selected !== "") {
      deleteAnimation(selected);
      setSelected("");
    }
  };

  const openAnimation = (e) => {
    setSelected(e.target.value);
  };

  const moveAnimationUp = (e) => {
    const index = item.animations.indexOf(selected);
    if (index === -1) {
      return;
    }
    const newAnimations = [...item.animations];
    if (index > 0) {
      [newAnimations[index - 1], newAnimations[index]] = [
        newAnimations[index],
        newAnimations[index - 1],
      ];
    }
    modifyItem({
      ...item,
      animations: newAnimations,
    });
  };

  const moveAnimationDown = (e) => {
    const index = item.animations.indexOf(selected);
    if (index === -1) {
      return;
    }
    const newAnimations = [...item.animations];
    if (index < item.animations.length - 1) {
      [newAnimations[index], newAnimations[index + 1]] = [
        newAnimations[index + 1],
        newAnimations[index],
      ];
    }
    modifyItem({
      ...item,
      animations: newAnimations,
    });
  };

  const getAnimationName = (id) => {
    return animations[id].name;
  };

  const getSelectedAnimation = () => {
    if (selected === "") {
      return null;
    }
    const animation = animations[selected];
    return (
      <div
        className="animation-selection"
        style={{
          top: animation.top,
          left: animation.left,
          width: animation.width,
          height: animation.height,
        }}
      ></div>
    );
  };

  const fileAvailable = () => {
    return (
      <div>
        <div className="animation-panel">
          <div className="animation-manager">
            <ListDisplay
              name={"Animations"}
              container={item.animations}
              getName={getAnimationName}
              onChange={openAnimation}
              onButtonPlus={createAnimationHandler}
              onButtonMinus={deleteAnimationHandler}
              onButtonUp={moveAnimationUp}
              onButtonDown={moveAnimationDown}
            />
          </div>
          <div className="animation-display">
            {selected && <AnimationDisplay id={selected} />}
          </div>
        </div>
        <hr />
        <div style={{ position: "relative" }}>
          <img src={"img/" + item.filename} alt={item.name}></img>
          {getSelectedAnimation()}
        </div>
      </div>
    );
  };

  const fileNotAvailable = () => {
    return (
      <div>
        <div>Please select image file to be used for this graphic:</div>
        <input type="file" onChange={onUploadGraphic}></input>
      </div>
    );
  };

  return (
    <Window id={id}>
      {item.filename ? fileAvailable() : fileNotAvailable()}
    </Window>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  return {
    item: state.folderReducer[itemType][ownProps.id],
    animations: state.folderReducer.animations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
    createAnimation: (id) => {
      dispatch(createAnimation(id));
    },
    deleteAnimation: (id) => {
      dispatch(deleteAnimation(id));
    },
  };
};

WindowGraphics.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowGraphics);
