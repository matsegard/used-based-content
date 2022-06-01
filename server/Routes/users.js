const express = require("express");
const users = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const User = require("../models/User.models");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../utils/generateToken");

// COOKIE SESSION
users.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 1000 * 600, // 10s (quick expiry for testing, usually longer!)
    httpOnly: false,
    secure: false,
  })
);

// Redovisar alla registrerade Användare i databasen, används i utvecklingssyfte
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
      throw new Error("A user with the given username already exists");
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
      throw new Error("Globalt error");
    }
  })
);

// Logga in Användare
users.post(
  "/login",
  asyncHandler(async (req, res) => {
    if (req.session.id) {
      return res.status(401).send("Already logged in");
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      req.session.id = user.id;
      req.session.username = user.username;
      req.session.loginDate = new Date();
      console.log(req.session.username);
      res.status(201).json({
        username: req.session.username,
        id: req.session.id,
        loginDate: req.session.loginDate,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Wrong username or password");
    }
  })
);

// Redovisar inloggad Användare
users.get("/login", (req, res) => {
  if (!req.session.id) {
    return res.status(401).send("You're not logged in");
  } else {
    const user = {
      id: req.session.id,
      username: req.session.username,
    };
    res.status(201).json(user);
  }
});

// Ändra lösenord
users.put("/login", async (req, res) => {
  // const { password } = req.body;
  const { username } = req.body;
  var userId = req.session.id;
  if (!req.session.id) {
    return res.status(401).send("Wrong username");
  }

  if (username === req.session.username) {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPassword = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });
    res.status(201).json("Password updated successfully");
  } else {
    res.status(401).send("Wrong username");
  }
});

// Logga ut
users.delete(
  "/login",
  asyncHandler(async (req, res) => {
    if (!req.session.id) {
      return res.status(400).send("You have to be logged in to log out");
    }
    req.session = null;
    res.status(200).json("You are now logged out");
  })
);

module.exports = users;
