const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
  },
  _id: {
       type: mongoose.Schema.Types.ObjectId,
     
  }
});

module.exports = mongoose.model("Posts", PostSchema);
