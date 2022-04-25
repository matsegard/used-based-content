import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:5500/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      result = await result.json();
      setPassword("");
      setUsername("");
      console.log(result);
      return alert("inloggning lyckades");
    }

    return alert("Fel användarnamn / lösenord");
  };

  return (
    <div className="login-container">
      <div className="row d-flex justify-content-center flex-column align-items-center">
        <div className="login-form">
          <form onSubmit={loginHandler} id="loginform">
            <div className="form-group">
              <h1>Logga in</h1>
              <label>Användarnamn</label>
              <input
                type="text"
                className="form-control"
                id="userNameInput"
                name="userNameInput"
                aria-describedby="userNameHelp"
                placeholder="Ange användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <small
                id="userNameHelp"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="form-group">
              <label>Lösenord</label>
              <input
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Ange lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small
                id="passworderror"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="login-buttons">
              <button type="submit" className="btn btn-primary">
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
