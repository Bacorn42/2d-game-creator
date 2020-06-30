import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Window from "./Window";
import { modifyItem } from "../../actions/folderActions";

export function WindowAudio({ id, item, modifyItem }) {
  const onUploadAudio = (e) => {
    const filename = e.target.value.split("\\");
    modifyItem({
      ...item,
      filename: filename[filename.length - 1],
    });
  };

  const fileAvailable = () => {
    return (
      <div>
        <div>Your currently used audio:</div>
        <audio controls={true} src={"snd/" + item.filename}></audio>
      </div>
    );
  };

  const fileNotAvailable = () => {
    return (
      <div>
        <div>Please select audio file to be used:</div>
        <input type="file" onChange={onUploadAudio}></input>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
  };
};

WindowAudio.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowAudio);
