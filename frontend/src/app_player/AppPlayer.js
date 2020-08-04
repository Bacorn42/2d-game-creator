import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameWindow from "./components/GameWindow";
import Game from "../2dgs/model/Game";
import "./AppPlayer.css";

export function AppPlayer() {
  const [gameObj, setGameObj] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const param = url.searchParams.get("gameId");
    fetch("http://localhost:5000/api/game/" + param, {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((game) => {
        const newGame = new Game(game);
        setGameObj(newGame);
      });
  }, []);

  return (
    <div className="player">
      <div className="player-info">{gameObj && gameObj.title}</div>
      <div className="player-game">
        {gameObj && <GameWindow game={gameObj} />}
      </div>
      <Link to="/browse" className="player-link">
        <div className="player-back">Back to browsing!</div>
      </Link>
    </div>
  );
}

export default AppPlayer;
