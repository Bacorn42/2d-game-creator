import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./GameCard.css";

function GameCard({ game }) {
  return (
    <div className="gamecard">
      <p>
        <b>Title:</b> {game.title}
      </p>
      <p>
        <b>Author:</b> {game.author}
      </p>
      <p>
        <b>Description:</b> {game.description}
      </p>
      <Link to={"/player?gameId=" + game.id} className="gamecard-link">
        <div className="gamecard-play">Play!</div>
      </Link>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
