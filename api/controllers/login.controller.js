const jwt = require('jsonwebtoken')
const doaLogin = require('../models/login.model')

exports.login = async function (req, res) {
  if (req.body.password === undefined || req.body.password.length < 1) {
    res.status(400).json({ error: 'password required' })
  } else if (req.body.email === undefined || req.body.email.length < 1) {
    res.status(400).json({ error: 'email required' })
  } else {
    const users = await doaLogin.getUsers(req.body.email)
    if (users.rowsAffected < 1) {
      await res.status(404).json({ error: 'User not found' })
    } else {
      let user = {}
      for (const record of users.recordset) {
        const isPass = await doaLogin.checkPassword(req.body.password, record.password)
        if (isPass) {
          user = record
        }
      }
      if (user.id !== undefined) {
        doaLogin.updateLastLogin(user.id)
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY)
        delete user.password
        res.json({ user: user, token: token })
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    }
  }

  /*
  doaLogin.checkPassword('GoGoEstera', '$2b$10$b3PouS1BH5WQhIVsEZ148uvnhm8ZRvupCueBcmm53D1KzsihLXIx.').then((data) => {
    res.json(data);
  }) */
}
