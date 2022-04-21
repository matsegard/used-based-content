const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
const PORT =  5500;
const cors = require("cors");
const colors = require("colors")
const cookieSession = require('cookie-session')
const uuid = require('uuid')

//Import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');


//Define Middleware
app.use(express.json())
app.use(cors());

// COOKIE SESSION
app.use(cookieSession({
    secret: 'aVeryS3cr3tK3y',
    maxAge: 1000 * 20, // 10s (quick expiry for testing, usually longer!)
    sameSite: 'strict',
    httpOnly: true,
    secure: false
}))

app.use('/posts', postsRoute);
app.use('/user', usersRoute);
app.use('/login', loginRoute);


//Connect to mongoose
mongoose.connect(
process.env.DB_CONNECTION, { 
dbName: 'user-based-database',
useNewUrlParser: true,
useUnifiedTopology: true 
}, () =>
console.log('Connected to mongoDB'.bgBlue));

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgMagenta)
})


