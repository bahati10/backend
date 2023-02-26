const mongoose = require("mongoose")

const schema = mongoose.Schema({
    path: {
        data: Buffer,
        contentType: String
    },
    created_on: String,
})

module.exports = mongoose.model("Upload", schema)