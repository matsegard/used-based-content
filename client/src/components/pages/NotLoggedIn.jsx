import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <div className="login-container">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1>För att skriva Recensioner krävs ett konto</h1>
        <div className="form-group login-buttons">
          <Link to="/SignOrLog">
            <button className="btn btn-primary">Till inloggning</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
