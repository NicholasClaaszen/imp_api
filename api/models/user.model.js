const sql = require('./sql.model')

const changePassword = (id, hash) => {
  sql.execute(
    'UPDATE users SET password = @hash WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'hash', type: 'NVarChar', val: hash }
    ]
  )
}

const getRoles = async (id) => {
  const result = await sql.execute(
    'SELECT * FROM users_rights WHERE users_id  = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

module.exports = {
  changePassword,
  getRoles
}
