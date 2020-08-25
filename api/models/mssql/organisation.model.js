const sql = require('./sql.model')

const get = async (id) => {
  const result = await sql.execute(
    'SELECT organisation.id as id, ' +
    ' organisation.name as name, ' +
    ' organisation.is_default as isDefault, ' +
    ' organisation.base_url as baseURL, ' +
    ' contact.id as contact_id, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM organisation ' +
    'LEFT JOIN contact ' +
    ' ON organisation.contact_id  = contact.id ' +
    'WHERE organisation.id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getDefault = async () => {
  const result = await sql.execute(
    'SELECT organisation.id as id, ' +
    ' organisation.name as name, ' +
    ' organisation.is_default as isDefault, ' +
    ' organisation.base_url as baseURL, ' +
    ' contact.id as contact_id, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM organisation ' +
    'LEFT JOIN contact ' +
    ' ON organisation.contact_id  = contact.id ' +
    'WHERE organisation.is_default = 1',
    []
  )
  return result
}

const getAll = async () => {
  const result = await sql.execute(
    'SELECT organisation.id as id, ' +
    ' organisation.name as name, ' +
    ' organisation.is_default as isDefault, ' +
    ' organisation.base_url as baseURL, ' +
    ' contact.id as contact_id, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM organisation ' +
    'LEFT JOIN contact ' +
    ' ON organisation.contact_id  = contact.id ' +
    'ORDER BY organisation.is_default DESC',
    []
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE organisation ' +
    'SET name = @name, ' +
      'contact_id = @contactId, ' +
      'base_url = @baseURL ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'baseURL', type: 'NVarChar', val: data.baseURL },
      { name: 'contactId', type: 'NVarChar', val: data.contactId }
    ]
  )
  return result
}

const post = async (data) => {
  const result = await sql.execute(
    'INSERT INTO organisation ' +
    '(id, name, is_default, contact_id, base_url) ' +
    'VALUES ' +
    '(NEWID(), @name, @isDefault, @contactId, @baseURL)',
    [
      { name: 'isDefault', type: 'Bit', val: data.isDefault },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'baseURL', type: 'NVarChar', val: data.baseURL },
      { name: 'contactId', type: 'NVarChar', val: data.contactId }
    ]
  )
  return result
}

const remove = async (id) => {
  /* Can't remove organisations */
  return false
}

module.exports = {
  get,
  getDefault,
  getAll,
  put,
  post,
  remove
}
