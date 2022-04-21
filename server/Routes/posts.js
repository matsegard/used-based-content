const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.post('/', async (req, res) => {
try {
        const post = new Post(req.body);
        let result = await post.save();
        result = result.toObject();
        if (result) {
            res.send(req.body);
            console.log(result);
        } 

    } catch (e) {
        res.send("Something Went Wrong");
    }
});


module.exports = router;

