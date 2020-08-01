import React, { useState } from "react";
import PropTypes from "prop-types";

function Register({ setMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sending) {
      setSending(true);
      fetch("http://localhost:5000/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      })
        .then((response) => {
          if (response.status === 200) {
            setMessage("Registered successfully. You may now log in!");
          } else {
            setMessage("Username already exists.");
          }
          setSending(false);
        })
        .catch((err) => {
          setSending(false);
          setMessage("There was an error connecting to the server.");
        });
    }
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
      <label>
        Confirm password:
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <input type="submit" value="Register!" />
    </form>
  );
}

Register.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default Register;
