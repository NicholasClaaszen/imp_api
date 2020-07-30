require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./api/routes/routes')
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
routes(app)

module.exports = app
