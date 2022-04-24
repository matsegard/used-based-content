const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    res.json("error");
  }
});

router.post("/", async (req, res) => {
  // Kollar om användarnamnet finns, finns det så händer inget, annars skapas ett hashat lösenord som sparas i databasen.
  const userNameExist = await User.findOne({ username: req.body.username });
  if (userNameExist) {
    console.log("username taken");
    return res.status(409).json("Användare finns redan");
  }
  // Finns ingen registrerad användare med samma användarnamn, skapas en ny användare här
  else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    user.password = hashedPassword;
    let result = await user.save({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(result);
    return res.json(`Användare ${req.body.username} added`);
  }
});

module.exports = router;
