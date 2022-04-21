const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.post('/', async (req, res) => {

  const newPost = new Post(req.body);
  newPost.save()
    .then(item => {
      res.send("item saved to database");
      console.log(newPost)
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


module.exports = router;

