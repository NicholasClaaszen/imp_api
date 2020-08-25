const sql = require('./sql.model')

const get = async (id) => {
  const result = await sql.execute(
    'SELECT storage_container.id, ' +
    ' storage_container.name, ' +
    ' storage_container.description, ' +
    ' storage_location.id as location_id, ' +
    ' storage_location.name as location_name, ' +
    ' storage_location.address as location_address, ' +
    ' organisation.id as organisation_id, ' +
    ' organisation.name as organisation_name, ' +
    ' contact.id as contact_id, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM storage_container ' +
    'INNER JOIN storage_location ' +
    ' ON storage_container.storage_location_id = storage_location.id ' +
    'INNER JOIN organisation ' +
    ' ON storage_location.organisation_id = organisation.id ' +
    'LEFT JOIN contact ' +
    ' ON storage_location.contact_id  = contact.id ' +
    'WHERE storage_container.id = @id ',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getPerLocation = async (id) => {
  const result = await sql.execute(
    'SELECT storage_container.id, ' +
    ' storage_container.name, ' +
    ' storage_container.description, ' +
    ' storage_location.id as location_id, ' +
    ' storage_location.name as location_name, ' +
    ' storage_location.address as location_address, ' +
    ' organisation.id as organisation_id, ' +
    ' organisation.name as organisation_name, ' +
    ' contact.id as contact_id, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM storage_container ' +
    'INNER JOIN storage_location ' +
    ' ON storage_container.storage_location_id = storage_location.id ' +
    'INNER JOIN organisation ' +
    ' ON storage_location.organisation_id = organisation.id ' +
    'LEFT JOIN contact ' +
    ' ON storage_location.contact_id  = contact.id ' +
    'WHERE storage_location.id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getAll = async () => {
  const result = await sql.execute(
    'SELECT storage_container.id, ' +
    ' storage_container.name, ' +
    ' storage_container.description, ' +
    ' storage_location.id as location_id, ' +
    ' storage_location.name as location_name, ' +
    ' storage_location.address as location_address, ' +
    ' organisation.id as organisation_id, ' +
    ' organisation.name as organisation_name, ' +
    ' contact.id as contact_id, ' +
    ' contact.name as contact_name, ' +
    ' contact.email as contact_email, ' +
    ' contact.phone as contact_phone ' +
    'FROM storage_container ' +
    'INNER JOIN storage_location ' +
    ' ON storage_container.storage_location_id = storage_location.id ' +
    'INNER JOIN organisation ' +
    ' ON storage_location.organisation_id = organisation.id ' +
    'LEFT JOIN contact ' +
    ' ON storage_location.contact_id  = contact.id ' +
    'WHERE storage_container.active = 1 ' +
    'AND organisation.is_default = 1 ' +
    'ORDER BY storage_location.name ASC, storage_container.name ASC',
    []
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE storage_container ' +
    'SET name = @name, ' +
      'description = @description, ' +
      'storage_location_id = @locationId ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'description', type: 'NVarChar', val: data.description },
      { name: 'locationId', type: 'NVarChar', val: data.locationId }
    ]
  )
  return result
}

const post = async (data) => {
  const result = await sql.execute(
    'INSERT INTO storage_container ' +
    '(id, storage_location_id, organisation_id, name, description, active) ' +
    'VALUES ' +
    '(NEWID(), @locationId, @organisation, @name, @description, 1)',
    [
      { name: 'organisation', type: 'NVarChar', val: data.organisationId },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'description', type: 'NVarChar', val: data.description },
      { name: 'locationId', type: 'NVarChar', val: data.locationId }
    ]
  )
  return result
}

const remove = async (id) => {
  const result = await sql.execute(
    'UPDATE storage_container ' +
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
  getPerLocation,
  getAll,
  put,
  post,
  remove
}
