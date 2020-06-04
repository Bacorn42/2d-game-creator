import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Window from "./Window";
import Editor from "../shared/Editor";
import ListDisplay from "../shared/ListDisplay";
import { modifyItem } from "../../actions/folderActions";
import "./WindowFunctions.css";

export function WindowFunctions({ id, item, modifyItem }) {
  const [selected, setSelected] = useState("");

  const selectArg = (e) => {
    setSelected(e.target.value);
  };

  const createArg = (e) => {
    const newArgName = "arg_" + item.args.length;
    modifyItem({
      ...item,
      args: [...item.args, newArgName],
    });
  };

  const deleteArg = (e) => {
    modifyItem({
      ...item,
      args: item.args.filter((x) => x !== selected),
    });
    setSelected("");
  };

  const moveArgUp = (e) => {
    const index = item.args.indexOf(selected);
    if (index === -1) {
      return;
    }
    const newArgs = [...item.args];
    if (index > 0) {
      [newArgs[index - 1], newArgs[index]] = [
        newArgs[index],
        newArgs[index - 1],
      ];
    }
    modifyItem({
      ...item,
      args: newArgs,
    });
  };

  const moveArgDown = (e) => {
    const index = item.args.indexOf(selected);
    if (index === -1) {
      return;
    }
    const newArgs = [...item.args];
    if (index < item.args.length - 1) {
      [newArgs[index], newArgs[index + 1]] = [
        newArgs[index + 1],
        newArgs[index],
      ];
    }
    modifyItem({
      ...item,
      args: newArgs,
    });
  };

  const onArgNameChange = (e) => {
    const newName = e.target.value;
    const index = item.args.indexOf(selected);
    const newArgs = [...item.args];
    newArgs[index] = newName;
    modifyItem({
      ...item,
      args: newArgs,
    });
    setSelected(newName);
  };

  return (
    <Window id={id}>
      <div className="function-panel">
        <div className="function-args">
          <ListDisplay
            name={"Arguments"}
            container={item.args}
            getName={(id) => id}
            onChange={selectArg}
            onButtonPlus={createArg}
            onButtonMinus={deleteArg}
            onButtonUp={moveArgUp}
            onButtonDown={moveArgDown}
          />
          {selected && (
            <div>
              <div>Name:</div>
              <input
                type="text"
                value={selected}
                onChange={onArgNameChange}
              ></input>
            </div>
          )}
        </div>
        <Editor item={item} modifyItem={modifyItem} args={item.args} />
      </div>
    </Window>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  return {
    item: state.folderReducer[itemType][ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
  };
};

WindowFunctions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowFunctions);
