const express = require('express')
const router = express.Router()
const registerRouter = require('./register')
const loginRouter = require('./login')
const resetPasswordRouter = require('./reset-password')
// const uploadRouter = require('./upload')
const parksRouter = require('./parks')
const imagesRouter = require('./images')


router.use(registerRouter)
router.use(loginRouter)
router.use(resetPasswordRouter)
router.use(parksRouter)
router.use(imagesRouter)

// router.use(uploadRouter)

router.get('/test', (_, res) => {
    return res.json("Test Successful")
})
    
module.exports = router

