import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Window from "./Window";
import { modifyItem } from "../../actions/folderActions";
import "./WindowScenes.css";

export function WindowScenes({ id, item, objectNames, modifyItem }) {
  const [selectedObject, setSelectedObject] = useState(objectNames[0]);
  const [gridWidth, setGridWidth] = useState(32);
  const [gridHeight, setGridHeight] = useState(32);

  const selectedObjectHandler = (e) => {
    setSelectedObject(e.target.value);
  };

  const sceneWidthHandler = (e) => {
    const clippedWidth = Math.min(Math.max(e.target.value, 1), 2000);
    modifyItem({
      ...item,
      width: clippedWidth,
    });
  };

  const sceneHeightHandler = (e) => {
    const clippedHeight = Math.min(Math.max(e.target.value, 1), 2000);
    modifyItem({
      ...item,
      height: clippedHeight,
    });
  };

  const gridWidthHandler = (e) => {
    const clippedWidth = Math.min(Math.max(Number(e.target.value), 1), 2000);
    setGridWidth(clippedWidth);
  };

  const gridHeightHandler = (e) => {
    const clippedHeight = Math.min(Math.max(Number(e.target.value), 1), 2000);
    setGridHeight(clippedHeight);
  };

  const placeObject = (e) => {
    const objectId = getObjectId(e);
    if (!item.objects[objectId]) {
      modifyItem({
        ...item,
        objects: {
          ...item.objects,
          [objectId]: selectedObject,
        },
      });
    }
  };

  const getObjectId = (e) => {
    const target = document.querySelector("#scene-creator");
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const objectX = Math.floor(mouseX / gridWidth) * gridWidth;
    const objectY = Math.floor(mouseY / gridHeight) * gridHeight;
    const objectId = objectX + "_" + objectY;
    return objectId;
  };

  const removeObject = (e) => {
    e.preventDefault();
    if (e.target.className !== "scene-object") {
      return;
    }
    const objectX = Number(e.target.style.left.split("px")[0]);
    const objectY = Number(e.target.style.top.split("px")[0]);
    const objectId = objectX + "_" + objectY;

    const newObjects = {
      ...item.objects,
    };
    delete newObjects[objectId];
    modifyItem({
      ...item,
      objects: newObjects,
    });
  };

  const getGrid = () => {
    const grid = [];
    if (gridWidth >= 8) {
      for (let i = 0; i <= item.width; i += gridWidth) {
        grid.push(createGridLine(i, 0, 1, item.height));
      }
    }
    if (gridHeight >= 8) {
      for (let i = 0; i <= item.height; i += gridHeight) {
        grid.push(createGridLine(0, i, item.width, 1));
      }
    }
    return grid;
  };

  const createGridLine = (left, top, width, height) => {
    return {
      left: left + "px",
      top: top + "px",
      width: width + "px",
      height: height + "px",
    };
  };

  return (
    <Window id={id}>
      <div className="scene-panel">
        <div className="scene-settings">
          Object:
          <select onChange={selectedObjectHandler}>
            {objectNames.map((obj) => (
              <option key={obj} value={obj}>
                {obj}
              </option>
            ))}
          </select>
          Scene width:
          <input onChange={sceneWidthHandler} value={item.width} />
          Scene height:
          <input onChange={sceneHeightHandler} value={item.height} />
          Grid width:
          <input onChange={gridWidthHandler} value={gridWidth} />
          Grid height:
          <input onChange={gridHeightHandler} value={gridHeight} />
        </div>
        <div className="scene-creator-container">
          <div
            className="scene-creator"
            id="scene-creator"
            style={{ width: item.width + "px", height: item.height + "px" }}
            onClick={placeObject}
            onContextMenu={removeObject}
          >
            {getGrid().map((x, i) => (
              <div key={i} className="scene-grid" style={{ ...x }}></div>
            ))}
            {Object.keys(item.objects).map((x) => (
              <div
                key={x}
                className="scene-object"
                style={{
                  left: x.split("_")[0] + "px",
                  top: x.split("_")[1] + "px",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  const items = state.folderReducer;
  const objectNames = [
    ...Object.keys(items.objects).map((x) => items.objects[x].name),
  ];
  return {
    item: items[itemType][ownProps.id],
    objectNames: objectNames.filter(Boolean),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
  };
};

WindowScenes.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowScenes);
