import React, { useState } from "react";
import { connect } from "react-redux";
import { createItem } from "../../actions/folderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Toolbar.css";

export function Toolbar({ game, createItem }) {
  const [saving, setSaving] = useState(false);
  const [saveColor, setSaveColor] = useState("black");

  const saveGame = () => {
    setSaveColor("black");
    if (!saving) {
      fetch("http://localhost:5000/api/game", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      })
        .then((response) => {
          if (response.status === 200) {
            setSaveColor("green");
          } else {
            setSaveColor("red");
          }
          setSaving(false);
          setTimeout(() => setSaveColor("black"), 3000);
        })
        .catch((err) => {
          setSaveColor("red");
          setSaving(false);
          setTimeout(() => setSaveColor("black"), 3000);
        });
    }
  };

  return (
    <div className="toolbar">
      <FontAwesomeIcon
        icon="image"
        onClick={() => createItem("folders_graphics")}
        size="lg"
        className="toolbar-icon"
      />
      <FontAwesomeIcon
        icon="volume-up"
        onClick={() => createItem("folders_audio")}
        size="lg"
        className="toolbar-icon"
      />
      <FontAwesomeIcon
        icon="file-code"
        onClick={() => createItem("folders_functions")}
        size="lg"
        className="toolbar-icon"
      />
      <FontAwesomeIcon
        icon="cube"
        onClick={() => createItem("folders_objects")}
        size="lg"
        className="toolbar-icon"
      />
      <FontAwesomeIcon
        icon="tv"
        onClick={() => createItem("folders_scenes")}
        size="lg"
        className="toolbar-icon"
      />
      <FontAwesomeIcon
        icon={saving ? "spinner" : "save"}
        onClick={saveGame}
        size="lg"
        className={`toolbar-icon toolbar-icon-right toolbar-save-${saveColor}`}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    game: state.folderReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (id) => {
      dispatch(createItem(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
