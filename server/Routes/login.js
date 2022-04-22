const express = require('express');
const router = express.Router();
const Users = require("../models/User");
const bcrypt = require("bcrypt");
const { application } = require('express');
const cookieSession = require('cookie-session')
const uuid = require('uuid')

router.get('/', (req, res) => {
    res.send('We are on login');
});

router.post('/', async (req, res) => {
try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
          console.log('Inloggad')
    req.session.id = uuid.v4()
    req.session.username = req.body.username
    req.session.loginDate = new Date()
    req.session.role = undefined 
    console.log(req.session)
        res.send("Auth Successful");
      } else {
          console.log('Fel lösenord eller Användarnamn')
        res.send("Wrong username or password.");
      }
    } else {
      res.send("Wrong username or password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.get('/', (req, res) => {
    // Check if we are authorized (e.g logged in)
    if (!req.session.id) {
        return res.status(401).send('You are not logged in')
    }
    // Send info about the session (a cookie stored on the clinet)
    console.log(req.session)
})

router.delete('/', (req, res) => {
    if (!req.session.id) {
        return res.status(400).send('Du är inte inloggad')
    }
    req.session = null
    res.send('Du är nu utloggad')
})

module.exports = router;