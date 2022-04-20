import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  // const [password, setPassword] = useState("");
  // const [userName, setuserName] = useState("");
  // const [passwordError, setpasswordError] = useState("");
  // const [userNameError, setuserNameError] = useState("");

  // const handleValidation = (event) => {
  //   let formIsValid = true;

  //   if (!userName.match("^[A-Za-z][A-Za-z0-9_]{4,29}$")) {
  //     formIsValid = false;
  //     setuserNameError(
  //       "The username consists of 4-29 characters. Username can only contain letters, numbers and underscores (_). The first character must be a letter [a-z] or [A-Z]"
  //     );
  //     return false;
  //   } else {
  //     setuserNameError("");
  //     formIsValid = true;
  //   }

  //   if (!password.match(/^[a-zA-Z]{8,22}$/)) {
  //     formIsValid = false;
  //     setpasswordError(
  //       "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
  //     );
  //     return false;
  //   } else {
  //     setpasswordError("");
  //     formIsValid = true;
  //   }

  //   return formIsValid;
  // };

  // const loginSubmit = (e) => {
  //   e.preventDefault();
  //   handleValidation();
  // };

  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5500/user", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Data saved successfully");
      setpassword("");
      setuserName("");
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
              {/* <button type="submit" className="btn btn-primary">
                Logga in
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
