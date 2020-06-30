import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function GameObject({ coords, graphicsFilename, animation, object }) {
  const [sprite, setSprite] = useState(0);

  const frames =
    (animation.width * animation.height) /
    (animation.tileWidth * animation.tileHeight);

  useEffect(() => {
    const interval = setInterval(() => {
      setSprite((sprite) => (sprite + 1) % frames);
    }, (1000 / 30) * animation.every);
    return () => clearInterval(interval);
  }, [animation.every, frames]);

  const getLeftOffset = () => {
    return animation.left + animation.tileWidth * sprite;
  };

  return (
    <div
      style={{
        left: coords.split("_")[0] + "px",
        top: coords.split("_")[1] + "px",
        width: animation.tileWidth + "px",
        height: animation.tileHeight + "px",
        background: "url(img/" + graphicsFilename + ")",
        backgroundPosition:
          "top -" + animation.top + "px left -" + getLeftOffset() + "px",
        position: "absolute",
      }}
    ></div>
  );
}

GameObject.propTypes = {
  coords: PropTypes.string.isRequired,
  graphicsFilename: PropTypes.string.isRequired,
  animation: PropTypes.object.isRequired,
  object: PropTypes.object.isRequired,
};

export default GameObject;
