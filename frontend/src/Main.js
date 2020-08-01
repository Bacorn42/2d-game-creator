import React from "react";
import { Link } from "react-router-dom";
import Login from "./app_site/Login";
import Register from "./app_site/Register";
import "./Main.css";

export function Main() {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-card">
          <Login />
        </div>
        <div className="main-card">
          <Register />
        </div>
      </div>
      <div className="main-browse">
        <Link to="/browse" className="main-link">
          <div className="main-browse-button">Browse games!</div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
