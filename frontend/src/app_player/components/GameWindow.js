import React from "react";
import PropTypes from "prop-types";
import GameObject from "./GameObject";

export function GameWindow({ game }) {
  return (
    <div
      style={{
        width: game.scenes.scenes_0.width + "px",
        height: game.scenes.scenes_0.height + "px",
        backgroundColor: "#999",
        position: "relative",
      }}
    >
      {Object.keys(game.scenes.scenes_0.objects).map((obj) => {
        const object = game.objects[game.scenes.scenes_0.objects[obj]];
        const animation = game.animations[object.animation];
        const graphics = game.graphics[animation.parent];
        return (
          <GameObject
            key={obj}
            coords={obj}
            graphicsFilename={graphics.filename}
            animation={animation}
            object={object}
          />
        );
      })}
    </div>
  );
}

GameWindow.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameWindow;
