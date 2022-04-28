import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DeletePost() {
  const location = useLocation();
  const id = location.pathname;

  const navigate = useNavigate();
  const removePost = async () => {
    if (window.confirm("Vill du ta bort inlägget?")) {
      let result = await fetch(`${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        navigate("/MyProfile");
        return alert("Borttaget");
      }
      return alert("Det gick inte att ta bort inlägget");
    } else {
      console.log("du valde att ej logga ut");
    }
  };

  return (
    <div>
      <button onClick={removePost}>Ta bort inlägg</button>
    </div>
  );
}
