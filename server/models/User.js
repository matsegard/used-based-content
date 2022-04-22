const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
   username: {type:String, required:true},
   password: {type:String, required:true},
   posts: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

    
module.exports = mongoose.model('Users', UserSchema);