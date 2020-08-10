const express = require('express')
const app = express()

/* Helpers */
require('dotenv').config()
const pathToRegexp = require('path-to-regexp').pathToRegexp
const daoJWT = require('./api/models/jwt.model')
/* TODO: Decide if I want to leave this on globally - I mostly don't want to right now */
/* const daoLogging = require('./api/models/logging.model') */

/* Middleware imports */
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')

/* Route imports */
const homeRoute = require('./api/controllers/dummy.controller')
const loginRoute = require('./api/controllers/login.controller')
const jwtRoute = require('./api/controllers/jwt.controller')
const accountRoute = require('./api/controllers/account.controller')
const categoryRoute = require('./api/controllers/category.controller')

/* Settings */
const withoutLogin = [
  pathToRegexp('/home'),
  pathToRegexp('/login(.*)'),
  pathToRegexp('/api-docs(.*)')
]

/* Middleware */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(jwt({
  secret: process.env.JWT_KEY,
  algorithms: ['HS256'],
  isRevoked: daoJWT.isTokenRevoked
}).unless({ path: withoutLogin }))

/* Logging */
/* TODO: Decide if I want to leave this on globally - I mostly don't want to right now */
/* app.use((req, res, next) => {
  daoLogging.insert(req)
  next()
}) */

/* Routes */
app.use('/home', homeRoute)
app.use('/login', loginRoute)
app.use('/jwt', jwtRoute)
app.use('/user', accountRoute)
app.use('/category', categoryRoute)

/* Error Processing */
app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message })
})

module.exports = app
