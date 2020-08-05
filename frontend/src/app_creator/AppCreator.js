import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { connect } from "react-redux";
import { loadGame } from "./actions/folderActions";
import {
  faFolder,
  faFolderOpen,
  faImage,
  faVolumeUp,
  faFileCode,
  faCube,
  faTv,
  faListOl,
  faSave,
  faSpinner,
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import FolderView from "./components/main/FolderView";
import MainView from "./components/main/MainView";
import Toolbar from "./components/main/Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faFolder,
  faFolderOpen,
  faImage,
  faVolumeUp,
  faFileCode,
  faCube,
  faTv,
  faListOl,
  faSave,
  faSpinner,
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDown,
  faAngleRight
);

export function AppCreator({ loadGame }) {
  const [loaded, setLoaded] = useState(false);

  fetch("http://localhost:5000/api/login", {
    method: "get",
    credentials: "include",
  }).then((response) => {
    if (response.status === 200) {
      const url = new URL(window.location.href);
      const param = url.searchParams.get("gameId");
      fetch("http://localhost:5000/api/game/" + param, {
        method: "get",
      })
        .then((response) => {
          return response.json();
        })
        .then((game) => {
          loadGame(game);
          setLoaded(true);
        })
        .catch((err) => {
          setLoaded(true);
        });
    }
  });

  return (
    <div className="app">
      {loaded ? (
        <>
          <Toolbar />
          <div className="flex-container">
            <FolderView />
            <MainView />
          </div>
        </>
      ) : (
        <div className="app-loading">
          <FontAwesomeIcon icon="spinner" size="5x" />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadGame: (game) => {
      dispatch(loadGame(game));
    },
  };
};

export default connect(null, mapDispatchToProps)(AppCreator);
