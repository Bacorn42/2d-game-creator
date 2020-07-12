import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function GameObject({ object }) {
  const [sprite, setSprite] = useState(0);
  const animation = object.getAnimation();

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
        left: object.getX() + "px",
        top: object.getY() + "px",
        width: animation.tileWidth + "px",
        height: animation.tileHeight + "px",
        background: "url(img/" + object.getFilename() + ")",
        backgroundPosition:
          "top -" + animation.top + "px left -" + getLeftOffset() + "px",
        position: "absolute",
      }}
    ></div>
  );
}

GameObject.propTypes = {
  object: PropTypes.object.isRequired,
};

export default GameObject;
