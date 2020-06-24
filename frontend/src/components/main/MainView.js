import React from "react";
import { connect } from "react-redux";
import WindowGraphics from "../window/WindowGraphics";
import WindowAudio from "../window/WindowAudio";
import WindowFunctions from "../window/WindowFunctions";
import WindowObjects from "../window/WindowObjects";
import WindowScenes from "../window/WindowScenes";
import WindowFolders from "../window/WindowFolders";
import { moveWindow } from "../../actions/windowActions";

const WindowComponents = {
  graphics: WindowGraphics,
  audio: WindowAudio,
  functions: WindowFunctions,
  objects: WindowObjects,
  scenes: WindowScenes,
  folders: WindowFolders,
};

export function MainView({ windows_order, moveWindow }) {
  const getWindow = (window) => {
    const type = window.split("_")[0];
    const WindowComponent = WindowComponents[type];
    if (!WindowComponent) {
      return null;
    }
    return <WindowComponent key={window} id={window} />;
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { id, offsetX, offsetY } = JSON.parse(e.dataTransfer.getData("Text"));
    moveWindow(id, e.pageX - offsetX, e.pageY - offsetY);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-view" onDrop={onDrop} onDragOver={onDragOver}>
      {windows_order.map((x) => getWindow(x))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    windows_order: state.windowReducer.windows_order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moveWindow: (id, x, y) => {
      dispatch(moveWindow(id, x, y));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
