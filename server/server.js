const express = require('express');
const app = express();
const port = 5500;
const mongoose = require('mongoose');
require('dotenv/config')

//Import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use('/posts', postsRoute);
app.use('/user', usersRoute);

app.get('/', (req, res) => {
res.send("hello wworld")});


//Connect to mongoose
mongoose.connect(
process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
console.log('Connected to mongoDB'));


app.listen(port, () => {
  console.log('listening on: ' + port)
})


