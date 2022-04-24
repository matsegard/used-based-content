import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");

  // Logga in
  const handleOnLogin = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5500/user/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result) {
      result = await result.json();

      console.log(result);
    }
  };

  // const handleOnLogOut = async (e) => {
  //   e.preventDefault();
  //   let result = await fetch("http://localhost:5500/login", {
  //     method: "get",
  //     body: JSON.stringify({ username, password }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  // };

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
