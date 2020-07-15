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
  );
}

GameWindow.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameWindow;
