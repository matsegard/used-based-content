import "./MyProfile.css";

import EditPost from "./editPost";
import DeletePost from "./DeletePost";

export default function PostById() {
  return (
    <div>
      <EditPost />
      <DeletePost />
    </div>
  );
}
