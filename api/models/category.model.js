const sql = require('./sql.model')

const get = async () => {
  const result = await sql.execute(
    'SELECT id, name, icon ' +
    'FROM category ' +
    ' WHERE active = 1',
    []
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE category ' +
    'SET name = @name, ' +
      'icon = @icon ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'icon', type: 'NVarChar', val: data.icon }
    ]
  )
  return result
}

const post = async (data) => {
  const result = await sql.execute(
    'INSERT INTO category ' +
    '(id, name, icon, active) ' +
    'VALUES ' +
    '(NEWID(), @name, @icon, 1)',
    [
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'icon', type: 'NVarChar', val: data.icon }
    ]
  )
  return result
}

const remove = async (id) => {
  const result = await sql.execute(
    'UPDATE category ' +
    'SET active = 0 ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

module.exports = {
  get,
  put,
  post,
  remove
}
