import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function Login({ setMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push("/browse");
        } else {
          setMessage("Incorrect credentials!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Log in!" />
    </form>
  );
}

Login.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default Login;
