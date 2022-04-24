import { Routes, Route } from "react-router-dom";
import ContentPage from "./pages/ContentPage";
import CreateContent from "./pages/CreateContent";
import Login from "./pages/Login";
import "./Main.css";
import SignOrLog from "./pages/SignOrLog";
import CreateUser from "./pages/CreateUser";

export default function Main() {
  return (
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/SignOrLog" element={<SignOrLog />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateContent" element={<CreateContent />} />
      </Routes>
    </div>
  );
}
