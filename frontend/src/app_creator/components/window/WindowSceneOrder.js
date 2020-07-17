import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Window from "../window/Window";
import ListDisplay from "../shared/ListDisplay";
import { setSceneOrder } from "../../actions/folderActions";

export function WindowSceneOrder({ id, scenes, sceneOrder, setSceneOrder }) {
  const [selected, setSelected] = useState("");

  const selectScene = (e) => {
    setSelected(e.target.value);
  };

  const moveSceneUp = (e) => {
    const index = sceneOrder.indexOf(selected);
    if (index === -1) {
      return;
    }
    const newSceneOrder = [...sceneOrder];
    if (index > 0) {
      [newSceneOrder[index - 1], newSceneOrder[index]] = [
        newSceneOrder[index],
        newSceneOrder[index - 1],
      ];
    }
    setSceneOrder(newSceneOrder);
  };

  const moveSceneDown = (e) => {
    const index = sceneOrder.indexOf(selected);
    if (index === -1) {
      return;
    }
    const newSceneOrder = [...sceneOrder];
    if (index < sceneOrder.length - 1) {
      [newSceneOrder[index], newSceneOrder[index + 1]] = [
        newSceneOrder[index + 1],
        newSceneOrder[index],
      ];
    }
    setSceneOrder(newSceneOrder);
  };

  return (
    <Window id={id}>
      <ListDisplay
        name="Scene Order"
        container={sceneOrder}
        getName={(id) => scenes[id].name}
        onChange={selectScene}
        onButtonPlus={null}
        onButtonMinus={null}
        onButtonUp={moveSceneUp}
        onButtonDown={moveSceneDown}
      />
    </Window>
  );
}

const mapStateToProps = (state) => {
  return {
    scenes: state.folderReducer.scenes,
    sceneOrder: state.folderReducer.sceneOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSceneOrder: (sceneOrder) => {
      dispatch(setSceneOrder(sceneOrder));
    },
  };
};

WindowSceneOrder.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowSceneOrder);
