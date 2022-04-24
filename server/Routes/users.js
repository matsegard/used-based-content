const express = require("express");
const router = express.Router();
const usersModels = require("../models/User");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const uuid = require("uuid");

// theft proof cookie
router.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    sameSite: "strict",
    httpOnly: false,
    secrue: false,
    maxAge: 1000 * 100,
  })
);

// alla startar med /users
router.get("/", async (req, res) => {
  try {
    const users = await usersModels.find({});
    return res.json(users);
  } catch (err) {
    res.json("error");
  }
});

// Skapa användare
router.post("/", async (req, res) => {
  // Kollar om användarnamnet finns, finns det så händer inget, annars skapas ett hashat lösenord som sparas i databasen.
  const userNameExist = await usersModels.findOne({
    username: req.body.username,
  });

  if (userNameExist) {
    console.log("username taken");
    return res.status(409).json("Användare finns redan");
  }
  // Finns ingen registrerad användare med samma användarnamn, skapas en ny användare här
  else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new usersModels(req.body);
    user.password = hashedPassword;
    const result = await user.save({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(result);
    return res.json(`Användare ${req.body.username} skapad`);
  }
});

// LOGGA IN ANVÄNDARE
router.post("/login", async (req, res) => {
  try {
    if (req.session.user) {
      console.log("redan inloggad");
      return res.json("Already logged in");
    }
    // Kollar om användarnamnet finns
    const user = await usersModels.findOne({ username: req.body.username });
    if (user) {
      // Jämnför det hashade lösenordet som är sparat i databasen med lösenordet man skriver in i formen.
      const result = await bcrypt.compare(req.body.password, user.password);
      // Matchar lösenord med username så körs detta
      if (result) {
        req.session.id = uuid.v4();
        req.session.username = user.username;
        req.session.loginDate = new Date();
        req.session.role = undefined;
        console.log("inloggad");
        res.json(`Inloggad som ${req.session.username}`);
      }
    }
    // Om inte körs detta
    else {
      console.log("Fel lösenord eller Användarnamn");
      res.json("Wrong username or password.");
    }
  } catch (error) {
    //error handler
    console.log(error);
    res.status(500).json("Internal Server error Occured");
  }
});

router.get("/login", (req, res) => {
  res.send(`${req.session.username}`);
});

module.exports = router;
