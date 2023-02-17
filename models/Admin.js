const mongoose = require("mongoose")

const schema = mongoose.Schema({
    names: String,
    email: String,
    password: String,
})

module.exports = mongoose.model("Admin", schema);