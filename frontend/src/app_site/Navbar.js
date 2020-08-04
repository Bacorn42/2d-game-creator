import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const history = useHistory();

  const handleLogout = () => {
    fetch("http://localhost:5000/api/logout", {
      method: "get",
    }).then((response) => {
      history.push("/");
    });
  };

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
