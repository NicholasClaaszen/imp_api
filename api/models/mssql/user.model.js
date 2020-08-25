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

const hasRole = async (id, role, series) => {
  let result = false
  const roles = await getRoles(id)
  for (const record of roles.recordset) {
    if (record.code === role && record.event_series_id === series) {
      result = true
    }
  }
  return result
}

module.exports = {
  changePassword,
  getRoles,
  hasRole
}
