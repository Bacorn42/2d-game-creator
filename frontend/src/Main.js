import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./app_site/Login";
import Register from "./app_site/Register";
import "./Main.css";

export function Main() {
  const [message, setMessage] = useState("");

  return (
    <div className="main">
      {message !== "" && <div className="main-message">{message}</div>}
      <div className="main-container">
        <div className="main-card">
          <Login setMessage={setMessage} />
        </div>
        <div className="main-card">
          <Register setMessage={setMessage} />
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
