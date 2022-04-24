const express = require("express");
const router = express.Router();
const postModels = require("../models/Post");

router.get("/", async (req, res) => {
  const userPosts = await postModels.find({});
  res.send(userPosts);
});

router.post("/", async (req, res) => {
  const post = new postModels({
    title: req.body.title,
    description: req.body.description,
    postedBy: req.session._id,
  });
  const newPost = await post.save(post);
  console.log(newPost);
  res.json(newPost.title);
});

module.exports = router;
