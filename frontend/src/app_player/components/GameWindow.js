import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export function GameWindow({ game }) {
  const canvas = useRef(null);
  useEffect(() => {
    game.start(canvas);
    return () => game.stop();
  }, [game, canvas]);

  return (
    <canvas
      ref={canvas}
      tabIndex="1"
      onKeyDown={(e) => game.pressKey(e.key)}
      onKeyUp={(e) => game.releaseKey(e.key)}
      style={{
        backgroundColor: "#ccc",
        position: "relative",
      }}
      width={game.width}
      height={game.height}
    />
    /*<div
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
    </div>*/
  );
}

GameWindow.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameWindow;
