const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post.models");
const User = require("../models/User.models");
const cookieSession = require("cookie-session");


// theft proof cookie
// COOKIE SESSION
router.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 1000 * 600, // 10s (quick expiry for testing, usually longer!)
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
    const postedBy = req.session.username
    
    

    if (!title || !description) {
      res.status(400);
      throw new Error("fyll i alla fält");
    } else {
      const post = new Post({
        title,
        description,
        postedBy
      });

      const createdPost = await post.save();
      console.log(req.session.username)
      res.status(201).json(createdPost);
    }
  })
);

//  Hämtar alla recensioner skrivna av inloggad användare
router.get("/:postedBy", asyncHandler(async (req, res) =>{
      const postedBy = req.session.username
      const userPosts = await Post.find({ postedBy });
      res.send(userPosts);
}))

// Låter användare ta bort sina recensioner
router.delete("/:postedBy", asyncHandler(async (req, res) =>{
      const postedBy = req.session.username
      const userPosts = await Post.find({ postedBy });
      res.send(userPosts);
}))

module.exports = router;
