const usersModels = require("../models/User.models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// Redovisar alla registrerade Användare i databasen
const getAllUsers = async (req, res) => {
  try {
    const users = await usersModels.find({});
    return res.json(users);
  } catch (err) {
    res.json("error");
  }
};
exports.getAllUsers = getAllUsers;

// Skapar ny Användare
const createUser = async (req, res) => {
  const userNameExist = await usersModels.findOne({
    username: req.body.username,
  });
  if (userNameExist) {
    console.log("username taken");
    return res.status(409).json("Användare finns redan");
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new usersModels({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    return res.json(`Användare ${req.body.username} skapad`);
  }
};
exports.createUser = createUser;

// LOGGA IN ANVÄNDARE
const loginUser = async (req, res) => {
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
};
exports.loginUser = loginUser;

const currentUser = (req, res) => {
  res.send(`${req.session.user}`);
};
exports.currentUser = currentUser;
