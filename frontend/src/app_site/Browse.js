import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import "./Browse.css";

function Browse() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/games", {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((games) => {
        setGames(games);
      });
  }, []);

  return (
    <div className="browse">
      <div className="browse-title">Find a game!</div>
      <div className="browse-game-container">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Browse;
