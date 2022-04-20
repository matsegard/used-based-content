import { Routes, Route } from "react-router-dom";
import ContentPage from "./ContentPage";
import CreateContent from "./CreateContent";
import Login from "./Login";
import "./Main.css";

export default function Main() {
  return (
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateContent" element={<CreateContent />} />
      </Routes>
    </div>
  );
}
