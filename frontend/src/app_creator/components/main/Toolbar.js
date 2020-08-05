import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createItem } from "../../actions/folderActions";
import { openWindow } from "../../actions/windowActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Toolbar.css";

export function Toolbar({ game, createItem, openWindow }) {
  const [saving, setSaving] = useState(false);
  const [saveColor, setSaveColor] = useState("black");
  const history = useHistory();

  const saveGame = () => {
    setSaving(true);
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

  const exit = () => {
    history.push("/profile");
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
        icon="list-ol"
        onClick={() => openWindow("sceneOrderWindow")}
        size="lg"
        className="toolbar-icon toolbar-icon-separator"
      />
      <div className="toolbar-container-right">
        <FontAwesomeIcon
          icon={saving ? "spinner" : "save"}
          onClick={saveGame}
          size="lg"
          className={`toolbar-icon toolbar-icon-right toolbar-save-${saveColor}`}
        />
        <FontAwesomeIcon
          icon="window-close"
          onClick={exit}
          size="lg"
          className="toolbar-icon toolbar-icon-right"
        />
      </div>
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
    openWindow: (id) => {
      dispatch(openWindow(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
