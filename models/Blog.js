const mongoose = require("mongoose")

const schema = mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  content: String,
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Like' }
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  ],
  created_on: String,
});


module.exports = mongoose.model("Blog", schema)

