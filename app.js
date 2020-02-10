const express =  require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes')
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')

app.set('trust proxy', 1) // trust first proxy
app.use(morgan('short'))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)


module.exports = app