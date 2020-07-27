require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./api/routes/routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
routes(app)

module.exports = app
