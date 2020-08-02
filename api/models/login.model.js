const sql = require('./base.model')
const bcrypt = require('bcrypt')

const getUsers = async (email) => {
  const result = await sql.execute(
    'SELECT * FROM users WHERE email = @mail',
    [{ name: 'mail', type: 'NVarChar', val: email }]
  )
  return result
}

const updateLastLogin = (id) => {
  sql.execute(
    'UPDATE users SET lastlogindate = GETDATE() WHERE id = @id',
    [{ name: 'id', type: 'NVarChar', val: id }]
  )
}

const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

const hashPassword = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

module.exports = {
  getUsers,
  updateLastLogin,
  checkPassword,
  hashPassword
}
