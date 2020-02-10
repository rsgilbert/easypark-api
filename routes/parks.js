const express = require('express')
const router = express.Router()

const Park = require('../models/park')

router.get('/parks', async (req, res) => {
    const parks = await Park.find({})
    return res.json(parks)
})

router.post('/parks', async (req, res) => {
    const newPark = req.body
    const park = await Park.create(newPark)
    console.log(park)
    return res.json(park)
})


module.exports = router
