const express = require('express');
const router = express.Router();
const Users = require("../models/User");
const bcrypt = require("bcrypt");


router.get('/', (req, res) => {
    res.send('We are on login');
});

router.post('/', async (req, res) => {
    // Check if username and password is correct
    const user = Users.findOne({username: req.body.username, password: req.body.password})
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).send('Wrong password or username')
    }
    
    // Check if user aleady is logged in
    if (req.session.id) {
        return res.send('Already logged in')
    } else{
        console.log(req.body.username)
    }

    // Save info about the user to the session (a cookie stored on the clinet)
     req.session.id = uuid.v4()
     req.session.username = user.name
     req.session.loginDate = new Date()
     req.session.role = undefined // User could have a role (access privileges)
     res.send('Successful login')
})

// router.delete('/logout', (req, res) => {
//     if (!req.session.id) {
//         return res.status(400).send('Cannot logout when you are not logged in')
//     }
//     req.session = null
//     res.send('Your are now logged out')
// })

router.get('/', (req, res) => {
    // Check if we are authorized (e.g logged in)
    if (!req.session.id) {
        return res.status(401).send('You are not logged in')
    }
    // Send info about the session (a cookie stored on the clinet)
    res.send(req.session)
})



module.exports = router;