const sql = require('./base.model')

exports.getUsers = async (email) => {
  const result = await sql.execute('SELECT * FROM users WHERE email = @mail', [{ name: 'mail', type: 'NVarChar', val: email }])
  return result
}

exports.updateLastLogin = async (id) => {
  sql.execute('UPDATE users SET lastlogindate = GETDATE() WHERE id = @id', [{ name: 'id', type: 'NVarChar', val: id }])
}

exports.checkPassword = async (password, hash) => {
  const bcrypt = require('bcrypt')
  return await bcrypt.compare(password, hash)
}

exports.hashPassword = async (password) => {
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}
