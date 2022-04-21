const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    // ,
    // source: {
    //     type: String
    // },
    // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Posts', PostSchema);