const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const passport = require('passport')
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const appUrl = process.env.APP_URL;

const User = require('../models/user')


const hashPassword = async password => {
    return await bcrypt.hash(password, saltRounds)
}

const signedToken = (user, exp='30d') => {
    return jwt.sign({ user }, secret(), {
        expiresIn: exp
    })
}

const sendActivationLink = async (link, email) => {
    return await sgMail.send({
		to: email,
		from: 'pfms@contacts.com',
		subject: 'Activate your PFMS account',
        html: `<a href="${link}">Verify Email Address</button>`
    })
}

const sendResetPasswordLink = async (link, email) => {
    return sgMail.send({
		to: email,
		from: 'pfms@contacts.com',
		subject: 'Reset your PFMS account password',
        html: `<a href="${link}">Reset password</button>`
    })
}

const secret = () =>
`
** KEEP IT SIMPLE **
pKGf1IktVe79WUMDdPxo
jjhBTlCeRrPFL9ILB1iV
kezUGjZWHLTLXwrNn6mT
ZlKJqRT3DtunngXsAZtt
`;

const statusCodes = () => ({
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
})

const tokenPayload = async token => await jwt.verify(token, secret())

const s3Link = fileName => `https://pfms-bucket.s3.amazonaws.com/${fileName}`

const authMiddleware =  () => {
    console.log("auth")
    const options = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret()
    };
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        console.log(jwt_payload)
        try {
            console.log(jwt_payload)
            if(await User.exists(jwt_payload.user)) {
                return done(null, jwt_payload.user)
            } else return done(null, false)
        }
        catch(err) { console.log(err); return (err, null) }
    }));

    return passport.authenticate('jwt', {session: false})
};

module.exports = {
    hashPassword, appUrl, signedToken,
    secret, tokenPayload, sendActivationLink,
    sendResetPasswordLink, 
    authMiddleware, s3Link,  statusCodes
};

