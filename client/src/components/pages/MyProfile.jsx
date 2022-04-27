import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MyProfile() {
  const { login } = useUser();
  const [changePasswordForm, setchangePasswordForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    let result = await fetch("/user/login", {
      method: "PUT",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      result = await result.json();
      setPassword("");
      setUsername("");
      console.log("lösenordet ändrat");
    }
    return alert("funkar ej");
  };

  // Logga ut knapp
  const LogoutHandler = async (e) => {
    if (window.confirm("Vill du logga ut?")) {
      let result = await fetch("/user/login", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        login();
        return alert("Du är utloggad");
      }
      return alert("Utloggning misslyckades");
    } else {
      console.log("du valde att ej logga ut");
    }
  };

  // Rendrerar ett byt lösenord-form
  const changePassword = async () => {
    setchangePasswordForm(true);
  };

  return (
    <div>
      <h1>Min profil</h1>

      <Link to="/">
        <button onClick={LogoutHandler} pe="submit" className="btn btn-primary">
          Logga ut
        </button>
      </Link>
      {!changePasswordForm ? (
        <button
          onClick={changePassword}
          pe="submit"
          className="btn btn-primary"
        >
          Ändra lösenord
        </button>
      ) : (
        <form id="loginform">
          <div className="form-group">
            <h1>Ändra lösenord</h1>
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
            <small id="userNameHelp" className="text-danger form-text"></small>
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
            <small id="passworderror" className="text-danger form-text"></small>
          </div>
          <div className="login-buttons">
            <button
              onClick={changePasswordHandler}
              type="submit"
              className="btn btn-primary"
            >
              Ändra lösenord
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
