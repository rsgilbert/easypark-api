const mongoose = require('mongoose')


const imageSchema = mongoose.Schema({
    parkId: { type: String, required: true },
    image: { type: String, required: true },
})

module.exports = mongoose.model("Image", imageSchema)

