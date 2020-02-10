const mongoose = require('mongoose')

const parkSchema = mongoose.Schema({
    name: { type: String, required: true },    
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    slots: Number,
    open: { type: Boolean, default: true },
    picture: String,
    creatorId: String,
    managerId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
   
})


module.exports = mongoose.model("Park", parkSchema)


