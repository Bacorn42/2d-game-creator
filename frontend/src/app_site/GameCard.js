import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./GameCard.css";

function GameCard({ game, edit }) {
  const getCollaborators = () => {
    if (game.collaborators.length > 0) {
      let str = " with ";
      for (let i = 0; i < game.collaborators.length; i++) {
        str += game.collaborators[i];
        if (i !== game.collaborators.length - 1) {
          str += ", ";
        }
      }
      return <>{str}</>;
    }
  };

  return (
    <div className="gamecard">
      <p>
        <b>Title:</b> {game.title}
      </p>
      <p>
        <b>Author(s):</b> {game.author}
        {getCollaborators()}
      </p>
      <p>
        <b>Description:</b> {game.description}
      </p>
      <Link to={"/player?gameId=" + game.id} className="gamecard-link">
        <div className="gamecard-play">Play!</div>
      </Link>
      {edit && (
        <Link to={"/creator?gameId=" + game.id} className="gamecard-link">
          <div className="gamecard-play">Edit!</div>
        </Link>
      )}
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  edit: PropTypes.bool,
};

export default GameCard;
