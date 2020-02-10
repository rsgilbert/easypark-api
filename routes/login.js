const express = require('express')
const router = express.Router()
const { signedToken } = require('./utils')
const User = require('../models/user')


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(user) {
        user.checkPassword(password, (err, isMatch) => {
            if(err) {
                return res.status(500).end()
            } else {
                if(isMatch) {
                    console.log(signedToken(user))
                    return res.json(user)
                } else {
                    return res.status(401).end()
                }
            }
        })
    } else {
        return res.status(404).end()
    } 
})

module.exports = router