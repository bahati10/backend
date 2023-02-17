const mongoose = require("mongoose")

const schema = mongoose.Schema({
    comment: String,
    blogId : String,
    user: 
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      ,
    created_on: String,
})

module.exports = mongoose.model("Comment", schema)