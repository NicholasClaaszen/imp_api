const accountRouter = require('express').Router()
const daoLogin = require(`../models/${process.env.DB_TYPE}/login.model`)
const daoUser = require(`../models/${process.env.DB_TYPE}/user.model`)

accountRouter.post('/password', (req, res, next) => {
  /*
  * Password validation:
  * - Minlength 8
  * - At least one capital
  * - At least one special character
  * - At least one number
  * */
  const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
  if (
    req.body.password === undefined ||
    req.body.password.length < 8 ||
    !(/\d/.test(req.body.password)) ||
    !(/[A-Z]/.test(req.body.password)) ||
    !(format.test(req.body.password))
  ) {
    return res.status(400).json({ error: 'invalid_password' })
  }

  daoLogin.hashPassword(req.body.password).then((hash) => {
    daoUser.changePassword(req.user.subject, hash)
  })
  return res.status(200).json('OK')
})

module.exports = accountRouter
