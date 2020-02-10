const express = require('express')
const router = express.Router()

const Image = require('../models/image')

router.get('/images', async (req, res) => {
    const images = await Image.find({})
    console.log(images)
    return res.json(images)
})


router.post('/images', async (req, res) => {
    const newImage = req.body
    const image = await Image.create(newImage)
    console.log(image)
    return res.json(image)
})


module.exports = router
