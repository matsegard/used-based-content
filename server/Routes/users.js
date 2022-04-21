const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', (req, res) => {
    res.send('We are on users');
});

router.post('/', async (req, res) => {
     try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            res.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        res.send("Something Went Wrong");
    }
});



module.exports = router;

