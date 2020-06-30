import React from "react";
import { Link } from "react-router-dom";

export function Menu() {
  return (
    <div>
      <Link to="/creator">Creator</Link>
      <br />
      <Link to="/player">Player</Link>
    </div>
  );
}

export default Menu;
