import React, { useState } from "react";

function LoginForm(props) {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin(ID, password); // Call the prop function from App.js
  }

  return (
    <div id="container">
      <h1 id="login">Login</h1>
      <form id="user_details" onSubmit={handleSubmit}>
        <label htmlFor="ID">ID:</label>
        <br />
        <input
          type="text"
          id="ID"
          name="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="p_word" id="pword">
          Password:
          <span className="password-toggle-icon">
            <i className="far fa-eye"></i>
          </span>
        </label>
        <br />
        <input
          type="password"
          id="p_word"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
