const express = require("express");
const users = express.Router();
const cookieSession = require("cookie-session");

const User = require("../models/User.models");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

// theft proof cookie
users.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    sameSite: "strict",
    httpOnly: false,
    secrue: false,
    maxAge: 24 * 60 * 60 * 1000,
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
        username: user.username,
        password: user.password,
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
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        username: user.username,
      });
    } else {
      res.status(401);
      throw new Error("Fel användarnamn eller lösenord");
    }

    // save info about the user to the session (a coookie stored on the client)
    req.session.id = uuidv4();
    req.session.username = req.body.username;
    req.session.loginDate = new Date();
    console.log(req.session, "hejhej");
  })
);

// Redovisar inloggad Användare
users.get("/login", (req, res) => {
  if (req.session.id) {
    res.send("inloggad användare finns");
  }
  res.send(`${req.session.username}`);
});

// Nästkommande functions är under produktion

// router.get("/", (req, res) => {
//   // Check if we are authorized (e.g logged in)
//   if (!req.session.id) {
//     return res.status(401).send("You are not logged in");
//   }
//   // Send info about the session (a cookie stored on the clinet)
//   console.log(req.session);
// });

// router.delete("/", (req, res) => {
// //   if (!req.session.id) {
// //     return res.status(400).send("Du är inte inloggad");
// //   }
// //   req.session = null;
// //   res.send("Du är nu utloggad");
// // });

module.exports = users;
