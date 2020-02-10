const mongoose = require('mongoose')

const parkSchema = mongoose.Schema({
    name: { type: String, default: "Unknown" },    
    location: { type: String, default: "Unknown" },
    capacity: { type: Number, default: 20 },
    slots: { type: Number, default: 20 },
    open: { type: Boolean, default: true },
    phone: String,
    picture: String,
    creatorId: String,
    managerId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    latitude: { type: String, required: true },
    longitude: { type: Number, required: true },
   
})


module.exports = mongoose.model("Park", parkSchema)


