const express = require('express')
const router = express.Router()
const csrf = require('csurf')
const { tokenPayload, appUrl, signedToken, hashPassword, sendResetPasswordLink } = require('./utils')
const User = require('../models/user')

const csrfProtection = csrf({ cookie: true })

router.post('/forgot-password', async (req, res) => {
    const email = req.body.email
    const userExists = await User.exists({ email })
    if(userExists) {
        const signedResetToken = signedToken({ email }, '2h')
        const link = appUrl + "reset-password/" + signedResetToken  
        await sendResetPasswordLink(link, email)
        return res.status(200).json({}) 
    }
    else {
        return res.status(404).json({})
    }
})

router.get('/reset-password/:token', csrfProtection, async (req, res) => {
    try {
        const payload = await tokenPayload(req.params.token) 
        const email = payload.user.email
        res.render('reset-password', {
            'csrfToken': req.csrfToken(),
            'email': email
        })
    } catch (err) {
        return res.status(400).json(err)
    }
})

router.post('/reset-password/:token', csrfProtection, async (req, res) => {
    const payload = await tokenPayload(req.params.token) 
    const email = payload.user.email
    const newPassword = req.body.new_password
    const hashedPassword = await hashPassword(newPassword)
    User.findOneAndUpdate({ email }, {$set: { hashedPassword }}, {new: true}, (err, doc) => {
        if(err) {
            return res.status(500).json("Error")
        }
        if(doc) {
            return res.render('reset-success')
        } else { return res.json("No user found")}
    })
})

module.exports = router