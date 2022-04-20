const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.post('/', (req, res) => {
    console.log(req.body);

});

async function runCode() {
  const ryu = new Post({
    title: 'Liseberg',
    description: 'Najs öl på tyrolen'
  })

  const doc = await ryu.save()
  // console.log(doc)
}

runCode()
  .catch(error => { console.error(error) })

module.exports = router;

