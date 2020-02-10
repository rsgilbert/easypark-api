const express = require('express')
const router = express.Router()
const { hashPassword, signedToken, sendActivationLink } = require('./utils')
const User = require('../models/user')

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    let userExists = await User.exists({ email })
    if(userExists) {
        return res.status(409).end()
    }
    else {
        const hashedPassword = await hashPassword(password)
        const user = await User.create({ 
            email, hashedPassword
        })
        console.log(user)
        return res.json(user)
    }
})

module.exports = router

