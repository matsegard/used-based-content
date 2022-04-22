const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.post('/', async (req, res) => {

const post = new Post({title: req.body.title, description: req.body.description, postedBy: req.user._id});
const newPost = await post.save(post);
  console.log(newPost)
});


module.exports = router;

