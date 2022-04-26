import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineEdit, AiOutlineRead, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "./Header.css";
import { useUser } from "./context/UserContext";

export default function Header() {
  const { loggedIn } = useUser();

  let korv = "Logga in";
  if (!loggedIn) {
    korv = "Min sida";
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" variant="light" sticky="top">
        <Container>
          <div className="hamburgerContainer">
            <div>
              <Link style={{ textDecoration: "none" }} to="/">
                <img alt="logo" src={logo}></img>
              </Link>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </div>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navbarContent">
              <div className="logoContainer">
                <Link style={{ textDecoration: "none" }} to="/">
                  <img alt="logo" src={logo}></img>
                </Link>
              </div>
              <div className="linkContainer">
                <Link to="/">
                  <Nav>
                    <AiOutlineRead /> Recensioner
                  </Nav>
                </Link>
                <Link to="/CreateContent">
                  <Nav>
                    <AiOutlineEdit /> Skriv Recension
                  </Nav>
                </Link>

                <Link to="/SignOrLog">
                  <Nav>
                    <AiOutlineUser />
                    {korv}
                  </Nav>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
