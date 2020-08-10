const jwtRouter = require('express').Router()
const daoJWT = require('../models/jwt.model')

jwtRouter.get('/refresh', async (req, res, next) => {
  if (req.user === undefined) {
    return res.status(400).json({ error: 'Use refresh token' })
  }
  if (req.user.audience.split('+')[1] !== 'Refresh') {
    return res.status(400).json({ error: 'Use refresh token' })
  }
  const token = await daoJWT.signAuth(req.user)
  return res.json({ token: token })
})

jwtRouter.get('/logout/session', (req, res, next) => {
  daoJWT.revokeByID(req.user.jwtid)
  return res.json('OK')
})

jwtRouter.get('/logout/user', (req, res, next) => {
  daoJWT.revokeByUser(req.user.subject)
  return res.json('OK')
})

module.exports = jwtRouter
