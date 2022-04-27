const express = require("express");
const users = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const User = require("../models/User.models");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../utils/generateToken");

// theft proof cookie
// COOKIE SESSION
users.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 1000 * 600, // 10s (quick expiry for testing, usually longer!)
    httpOnly: false,
    secure: false,
  })
);
// alla startar med /users

// Redovisar alla registrerade Användare i databasen
users.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    res.json("error");
  }
});

// Skapar ny Användare
users.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const doesUserExist = await User.findOne({ username });

    if (doesUserExist) {
      res.status(404);
      throw new Error("Användare redan registrerad");
    }

    const user = await User.create({
      username: username,
      password: password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Globalt fel");
    }
  })
);

// Logga in Användare
users.post(
  "/login",
  asyncHandler(async (req, res) => {
    if (req.session.id) {
      console.log("redan inloggad");
      return res.status(401).send("Redan inloggad");
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      req.session.id = user.id;
      req.session.username = user.username;
      req.session.loginDate = new Date();
      console.log(req.session.username, req.session.id);

      res.status(201).json({
        username: req.session.username,
        id: req.session.id,
        loginDate: req.session.loginDate,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Fel användarnamn eller lösenord");
    }
  })
);

// Redovisar inloggad Användare
users.get("/login", (req, res) => {
  if (!req.session.id) {
    console.log("Ej inloggad");
    return res.status(401).send("Du är inte inloggad");
  } else {
   const user = {
      id :req.session.id,
      username: req.session.username,
    }
     res.status(201).json(user)
    console.log("Inloggad");
  }
});



// Ändra lösenord 
users.put("/login", async (req, res) => {
  // const { password } = req.body;
  const { username } = req.body;
  var userId = req.session.id;
  if(!req.session.id){
    return console.log('inte du')
  }

if(username === req.session.username){
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newPassword = await User.findByIdAndUpdate(userId, { password: hashedPassword });
console.log(newPassword)
res.status(201).json('Byte av lösenord lyckades')
} else {
  console.log('fel användarnamn')
  res.status(401).send("Fel användarnamn");
}
});

// Logga ut
users.delete(
  "/login",
  asyncHandler(async (req, res) => {
    if (!req.session.id) {
      return res.status(400).send("Cannot logout when you are not logged in");
    }
    req.session = null;
    res.json("Du är nu utloggad");
    
  })
);

module.exports = users;
