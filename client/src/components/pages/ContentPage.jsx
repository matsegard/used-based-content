import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./ContentPage.css";

export default function Contentpage() {
  const [posts, setPosts] = useState([
    {
      title: "",
      description: "",
      user: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5500/posts")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setPosts(jsonRes));
  });

  return (
    <section className="contentContainer">
      <div>
        <h1>Posts</h1>
        <div className="contentBox">
          {posts.map((post) => (
            <div className="postContent" key={post.title}>
              <Card
                style={{
                  maxWidth: "40rem",
                  minWidth: "20rem",
                  padding: "2rem 2rem",
                }}
              >
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {post.user} User: "användare"
                  </Card.Subtitle>
                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
