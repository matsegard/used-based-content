import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");

  // Skapa användare
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5500/user", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Användare skapad");
      setpassword("");
      setuserName("");
    }
  };

  // Logga in
  const handleOnLogin = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5500/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Inloggad");
      console.log("du är inloggad");
    }
  };

  return (
    <div className="login-container">
      <div className="row d-flex justify-content-center flex-column align-items-center">
        <div className="login-form">
          <form action="" id="loginform">
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
                onChange={(e) => setuserName(e.target.value)}
              />
              <small
                id="userNameHelp"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="form-group">
              <label>Lösenord</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Ange lösenord"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <small
                id="passworderror"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="login-buttons">
              <button
                type="submit"
                onClick={handleOnSubmit}
                className="btn btn-primary"
              >
                Skapa användare
              </button>
              <button
                onClick={handleOnLogin}
                type="submit"
                className="btn btn-primary"
              >
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
