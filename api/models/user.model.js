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

module.exports = {
  changePassword
}
