const express = require("express");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const PORT = 5500;
const cors = require("cors");
const colors = require("colors");
const cookieSession = require("cookie-session");

const app = express();
dotenv.config();
//Import routes
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");

//Define Middleware
app.use(express.json());

app.use("/posts", postsRoute);
app.use("/user", usersRoute);

//Connect to mongoose
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    dbName: "user-based-database",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to mongoDB".bgBlue)
);

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgMagenta);
});
