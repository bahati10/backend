const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	names: String,
	email: String,
	password: String,
	created_on: String,
})


module.exports = mongoose.model("User", userSchema)