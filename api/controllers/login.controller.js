const loginRouter = require('express').Router()
const daoJWT = require('../models/jwt.model')
const daoLogin = require('../models/login.model')
const daoUser = require('../models/user.model')

loginRouter.post('/', async (req, res, next) => {
  try {
    if (req.body.password === undefined || req.body.password.length < 1) {
      return res.status(400).json({ error: 'password_required' })
    }

    if (req.body.email === undefined || req.body.email.length < 1) {
      return res.status(400).json({ error: 'email_required' })
    }

    const users = await daoLogin.getUsers(req.body.email)
    if (users.rowsAffected < 1) {
      return res.status(404).json({ error: 'not_found' })
    }

    let user = {}
    for (const record of users.recordset) {
      const isPass = await daoLogin.checkPassword(req.body.password, record.password)
      if (isPass) {
        user = record
      }
    }
    if (user.id !== undefined) {
      daoLogin.updateLastLogin(user.id)
      user.roles = []
      const roles = await daoUser.getRoles(user.id)
      for (const role of roles.recordset) {
        if (role.event_series_id !== null) {
          user.roles.push(role.code + '-' + role.event_series_id)
        } else {
          user.roles.push(role.code)
        }
      }
      const token = daoJWT.signRefresh(user)
      delete user.password
      return res.json({ user: user, token: token })
    }
    return res.status(404).json({ error: 'not_found' })
  } catch (error) {
    return next(error)
  }
})

module.exports = loginRouter
