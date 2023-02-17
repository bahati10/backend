const mongoose = require("mongoose")

const schema = mongoose.Schema({
	name: String,
	email: String,
	message: String,
	sent_On: String,
})


module.exports = mongoose.model("Message", schema)








