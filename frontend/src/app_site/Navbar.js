import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:5000/api/login", {
      method: "get",
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        setLoggedIn(true);
      }
    });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/api/logout", {
      method: "post",
      credentials: "include",
    }).then((response) => {
      history.push("/");
    });
  };

  if (!loggedIn) {
    return (
      <div className="navbar">
        <div className="navbar-option">
          <Link to="/" className="navbar-link">
            <div className="navbar-button">Login</div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-option">
        <Link to="/profile" className="navbar-link">
          <div className="navbar-button">Profile</div>
        </Link>
      </div>
      <div className="navbar-option">
        <div className="navbar-button" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Navbar;
