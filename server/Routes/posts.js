const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post.models");
const User = require("../Routes/users");

// Hämtar alla recensioner
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userPosts = await Post.find({});
    res.send(userPosts);
  })
);

// Skapa ny recension
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error("fyll i alla fält");
    } else {
      const post = new Post({
        title,
        description,
      });

      const createdPost = await post.save();

      res.status(201).json(createdPost);
    }
  })
);

module.exports = router;
