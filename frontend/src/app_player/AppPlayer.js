import React, { useState, useEffect } from "react";
import GameWindow from "./components/GameWindow";

export function AppPlayer() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/game", {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((game) => {
        setGame(game);
        console.log(game);
      });
  }, []);

  return <div>{game && <GameWindow game={game} />}</div>;
}

export default AppPlayer;
