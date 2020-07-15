import React, { useState, useEffect } from "react";
import GameWindow from "./components/GameWindow";
import Game from "../2dgs/model/Game";

export function AppPlayer() {
  const [gameObj, setGameObj] = useState(null);

  useEffect(() => {
    let interval = null;
    fetch("http://localhost:5000/api/game", {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((game) => {
        const newGame = new Game(game);
        setGameObj(newGame);
        interval = setInterval(() => {
          newGame.update();
        }, 1000 / 30);
      });

    return () => clearInterval(interval);
  }, []);

  return <div>{gameObj && <GameWindow game={gameObj} />}</div>;
}

export default AppPlayer;
