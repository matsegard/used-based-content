import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./ContentPage.css";

export default function Contentpage() {
  const [posts, setPosts] = useState([
    {
      title: "",
      description: "",
      postedBy: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    fetch("/posts")
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
        <h1>Recensioner</h1>
        <div className="contentBox">
          {posts.map((post) => (
            <div className="postContent" key={post._id}>
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
                    Recension av: {post.postedBy}
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
