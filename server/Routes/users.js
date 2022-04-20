const express = require('express');
const router = express.Router();
const Post = require('../models/User')

router.get('/users', (req, res) => {
    res.send('We are on users');
});

router.post('/', (req, res) => {
    console.log(req.body);
});

async function runCode() {
  const ryu = new Post({
    username: 'Lovelanai',
    password: 'peniskokare'
  })

  const doc = await ryu.save()
  console.log(doc)
}

runCode()
  .catch(error => { console.error(error) })


module.exports = router;

