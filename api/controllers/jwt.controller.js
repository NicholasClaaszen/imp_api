const jwtRouter = require('express').Router()
const daoJWT = require('../models/jwt.model')

jwtRouter.get('/refresh', async (req, res, next) => {
  if (req.user.audience.split('+')[1] !== 'Refresh') {
    return res.status(400).json({ error: 'Use refresh token' })
  } else {
    return res.json({ token: daoJWT.signAuth(req.user) })
  }
})

jwtRouter.get('/logout/session', async (req, res, next) => {
  daoJWT.revokeByID(req.user.jwtid)
  return res.json('OK')
})

jwtRouter.get('/logout/user', async (req, res, next) => {
  daoJWT.revokeByUser(req.user.subject)
  return res.json('OK')
})

module.exports = jwtRouter
