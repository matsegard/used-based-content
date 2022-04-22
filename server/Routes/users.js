const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
    res.send('We are on users');
});

router.post('/', async (req, res) => {
const userNameExist = await User.findOne({username: req.body.username});
   if (userNameExist) {
     console.log('username taken');
     return res.status(409).send('Username already exists')
   } 
   res.status(200).json('Sucess')
const hashedPassword = await bcrypt.hash(req.body.password, 10)
const user = new User(req.body)
user.password = hashedPassword;
  let result = await user.save({username: req.body.username, password: hashedPassword});
  console.log(result)
   
})


module.exports = router;

