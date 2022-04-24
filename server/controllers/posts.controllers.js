const postModels = require("../models/Post.models");

// Hämtar alla posts
const getAllPosts = async (req, res) => {
  const userPosts = await postModels.find({});
  res.send(userPosts);
};
exports.getAllPosts = getAllPosts;

const createPost = async (req, res) => {
  const post = new postModels({
    title: req.body.title,
    description: req.body.description,
    postedBy: req.session._id,
  });
  const newPost = await post.save(post);
  console.log(newPost);
  res.json(newPost.title);
};
exports.createPost = createPost;
