// const express = require("express");
// const router = express.Router();
// const Users = require("../models/User");
// const bcrypt = require("bcrypt");
// const cookieSession = require("cookie-session");
// const uuid = require("uuid");
// const User = require("../models/User");

// // theft proof cookie
// router.use(
//   cookieSession({
//     secret: "aVeryS3cr3tK3y",
//     sameSite: "strict",
//     httpOnly: false,
//     secrue: false,
//     maxAge: 1000 * 100,
//   })
// );

// router.get("/", (req, res) => {
//   res.send("We are on login");
// });

// router.post("/", async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   console.log(user);

//   if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//     console.log(Users.password);
//     console.log(Boolean(req.body.password == user.password));
//     return res.status(401).send("Fel användarnamn eller lösenord");
//   }

//   // sparar användarens info till sessionen
//   (req.session.id = uuid),
//     (req.session.username = req.body.username),
//     (req.session.logindate = new Date());
//   res.json("Du har loggat in!");
// });

// // router.get("/", (req, res) => {
// //   // Check if we are authorized (e.g logged in)
// //   if (!req.session.id) {
// //     return res.status(401).send("You are not logged in");
// //   }
// //   // Send info about the session (a cookie stored on the clinet)
// //   console.log(req.session);
// // });

// // router.delete("/", (req, res) => {
// //   if (!req.session.id) {
// //     return res.status(400).send("Du är inte inloggad");
// //   }
// //   req.session = null;
// //   res.send("Du är nu utloggad");
// // });

// module.exports = router;
