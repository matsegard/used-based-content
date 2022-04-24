const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const usersController = require("../controllers/users.controllers");

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

// Redovisar alla registrerade Användare i databasen
router.get("/", usersController.getAllUsers);

// Skapar ny Användare
router.post("/", usersController.createUser);

// Logga in Användare
router.post("/login", usersController.loginUser);

// Redovisar inloggad Användare
router.get("/login", usersController.currentUser);

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

module.exports = router;
