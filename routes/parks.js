const express = require('express')
const router = express.Router()

const Park = require('../models/park')

router.get('/parks', async (req, res) => {
    const parks = await Park.find({})
    return res.json(parks)
})

router.post('/parks', async (req, res) => {
    const unknown = "Unknown"
    const capacity = 20
    const newPark = req.body
    newPark.name = unknown
    newPark.location = unknown
    newPark.capacity = capacity
    const park = await Park.create(newPark)
    console.log(park)
    return res.json(park)
})


module.exports = router
