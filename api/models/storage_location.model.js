const sql = require('./sql.model')

const get = async (id) => {
  const result = await sql.execute(
    'SELECT storage_location.id, ' +
    ' storage_location.name, ' +
    ' storage_location.address, ' +
    ' organisation.id as organisation_id, ' +
    ' organisation.name as organisation_name, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM storage_location ' +
    'INNER JOIN organisation ' +
    ' ON storage_location.organisation_id = organisation.id ' +
    'LEFT JOIN contact ' +
    ' ON storage_location.contact_id  = contact.id ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getAll = async () => {
  const result = await sql.execute(
    'SELECT storage_location.id, ' +
    ' storage_location.name, ' +
    ' storage_location.address, ' +
    ' organisation.id as organisation_id, ' +
    ' organisation.name as organisation_name, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM storage_location ' +
    'INNER JOIN organisation ' +
    ' ON storage_location.organisation_id = organisation.id ' +
    'LEFT JOIN contact ' +
    ' ON storage_location.contact_id  = contact.id ' +
    'WHERE storage_location.active = 1',
    []
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE storage_location ' +
    'SET name = @name, ' +
      'address = @address ' +
      'contact_id = @contactId ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'address', type: 'NVarChar', val: data.address },
      { name: 'contactId', type: 'NVarChar', val: data.contactId }
    ]
  )
  return result
}

const post = async (data) => {
  const result = await sql.execute(
    'INSERT INTO storage_location ' +
    '(id, organisation_id, name, address, contact_id, active) ' +
    'VALUES ' +
    '(NEWID(), @organisation, @name, @address, @contactId, 1)',
    [
      { name: 'organisation', type: 'NVarChar', val: data.organisation },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'address', type: 'NVarChar', val: data.address },
      { name: 'contactId', type: 'NVarChar', val: data.contactId }
    ]
  )
  return result
}

const remove = async (id) => {
  const result = await sql.execute(
    'UPDATE storage_location ' +
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
