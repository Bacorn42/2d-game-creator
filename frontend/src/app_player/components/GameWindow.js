import React from "react";
import PropTypes from "prop-types";
import GameObject from "./GameObject";

export function GameWindow({ game }) {
  return (
    <div
      tabIndex="1"
      onKeyDown={(e) => game.pressKey(e.key)}
      onKeyUp={(e) => game.releaseKey(e.key)}
      style={{
        width: game.width + "px",
        height: game.height + "px",
        backgroundColor: "#999",
        position: "relative",
      }}
    >
      {game.entities.map((entity) => (
        <GameObject key={entity.id} object={entity} />
      ))}
    </div>
  );
}

GameWindow.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameWindow;
