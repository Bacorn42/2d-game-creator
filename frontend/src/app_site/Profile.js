import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import GameCard from "./GameCard";
import { useHistory } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:5000/api/login", {
      method: "get",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          history.push("/");
          return null;
        }
      })
      .then((user) => {
        if (user) {
          setUser(user);
          fetch("http://localhost:5000/api/games/" + user._id, {
            method: "get",
            credentials: "include",
          })
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              setGames(json);
            });
        }
      });
  }, [history]);

  const handleNewGame = () => {
    fetch("http://localhost:5000/api/game", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((game) => {
        history.push("/creator?gameId=" + game._id);
      });
  };

  if (!user) {
    return <div className="profile"></div>;
  }

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-name">{user.username}</div>
      <div className="profile-newgame-button" onClick={handleNewGame}>
        New game!
      </div>
      <div className="profile-game-container">
        {games.map((game) => (
          <GameCard key={game.id} game={game} edit={true} />
        ))}
      </div>
      <div className="profile-browse">
        <Link to="/browse" className="profile-link">
          <div className="profile-browse-button">Browse games!</div>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
