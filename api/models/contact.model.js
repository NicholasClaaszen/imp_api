const sql = require('./sql.model')

const get = async (id) => {
  const result = await sql.execute(
    'SELECT ' +
    'contact.id, ' +
    'contact.name, ' +
    'contact.email, ' +
    'contact.phone, ' +
    'organisation.id as organisation_id, ' +
    'organisation.name as organisation_name, ' +
    'organisation.is_default as organisation_default ' +
    'FROM contact ' +
    'INNER JOIN organisation ' +
    ' ON contact.organisation_id = organisation.id ' +
    'WHERE contact.id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getAll = async () => {
  const result = await sql.execute(
    'SELECT ' +
    'contact.id, ' +
    'contact.name, ' +
    'contact.email, ' +
    'contact.phone, ' +
    'FROM contact ' +
    'INNER JOIN organisation ' +
    ' ON contact.organisation_id = organisation.id ' +
    'WHERE organisation.is_default = 1 ' +
    'AND contact.active = 1',
    []
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE contact ' +
    'SET name = @name, ' +
    'email = @email ' +
    'phone = @phone ' +
    'organisation_id = @organisationId ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'email', type: 'NVarChar', val: data.email },
      { name: 'phone', type: 'NVarChar', val: data.phone },
      { name: 'organisationId', type: 'NVarChar', val: data.organisationId }
    ]
  )
  return result
}

const post = async (data) => {
  const result = await sql.execute(
    'INSERT INTO contact ' +
    '(id, name, email, phone, active, organisation_id) ' +
    'VALUES ' +
    '(NEWID(), @name, @email, @phone, 1, @organisationId)',
    [
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'email', type: 'NVarChar', val: data.email },
      { name: 'phone', type: 'NVarChar', val: data.phone },
      { name: 'organisationId', type: 'NVarChar', val: data.organisationId }
    ]
  )
  return result
}

const remove = async (id) => {
  const result = await sql.execute(
    'UPDATE contact ' +
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
  getAll,
  put,
  post,
  remove
}
