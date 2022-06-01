const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post.models");
const User = require("../models/User.models");
const cookieSession = require("cookie-session");
const { ObjectId } = require("mongodb");

// theft proof cookie
// COOKIE SESSION
router.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: false,
    secure: false,
  })
);

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
    const postedBy = req.session.username;
    const id = req.params.id;
    const { _id } = ObjectId(id);

    if (postedBy) {
      if (!title || !description) {
        res.status(400);
        throw new Error("Fill in all fields");
      } else {
        const post = new Post({
          title,
          description,
          postedBy,
          id,
        });

        const createdPost = await post.save();
        return res.status(201).json(createdPost);
      }
    } else {
      res.status(400).json("You have to be logged in to create a new post");
    }
  })
);

//  Hämtar alla recensioner skrivna av inloggad användare
router.get(
  "/postedBy",
  asyncHandler(async (req, res) => {
    const postedBy = req.session.username;
    const userPosts = await Post.find({ postedBy });
    res.send(userPosts);
    return;
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const currentPost = await Post.findById(id);
    const postAuthor = currentPost.postedBy;

    const loggedInUser = req.session.username;

    if (loggedInUser) {
      if (postAuthor === loggedInUser) {
        if (!currentPost) {
          res.json("No post with this id does exist");
          return;
        } else {
          const updatedPost = await Post.findByIdAndUpdate(id, req.body);
          return res.json(updatedPost);
        }
      } else {
        res.status(403).json("You are only allowed to edit your own posts.");
      }
    } else {
      res.status(400).json("You have to be logged in to update a post");
    }
  })
);

//Ska hämta resencion by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const currentPost = await Post.findById(id);

    if (!currentPost) {
      res.status(400).json("No post with this id exists");
      return;
    } else {
      res.status(200).json(currentPost);
    }
  })
);

// Ta bort inlägg som en inloggad användare skapat
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const currentPost = await Post.findById(id);
    const postAuthor = currentPost.postedBy;
    const loggedInUser = req.session.username;

    if (loggedInUser) {
      if (postAuthor === loggedInUser) {
        if (!currentPost) {
          res.status(400).json("No post with this id does exist");
          return;
        } else {
          const deletePost = await Post.findByIdAndRemove(id);
          return res.status(200).json(deletePost);
        }
      } else {
        res.status(403).json("You are only allowed to delete your own posts.");
      }
    } else {
      res.status(400).json("You have to be logged in to delete a post");
    }
  })
);
module.exports = router;
