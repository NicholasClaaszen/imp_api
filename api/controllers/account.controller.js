const accountRouter = require('express').Router()
const daoLogin = require('../models/login.model')
const daoUser = require('../models/user.model')

accountRouter.post('/password', (req, res, next) => {
  daoLogin.hashPassword(req.body.password).then((hash) => {
    daoUser.changePassword(req.user.subject, hash)
  })
  return res.status(200).json('OK')
})

module.exports = accountRouter
