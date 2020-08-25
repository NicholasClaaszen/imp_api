const sql = require('./sql.model')

const get = async (id) => {
  const result = await sql.execute(
    'SELECT properties.id, ' +
    'properties.category_id, ' +
    'properties.name, ' +
    'properties.property_type, ' +
    'properties.drift, ' +
    'property_options.id as option_id, ' +
    'property_options.name as option_name, ' +
    'property_options.position as option_position ' +
    'FROM properties ' +
    'LEFT JOIN property_options ' +
    ' ON properties.id = property_options.properties_id ' +
    'WHERE properties.id = @id ' +
    'ORDER BY property_options.position ASC',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getAll = async () => {
  const result = await sql.execute(
    'SELECT properties.id, ' +
    'properties.name, ' +
    'properties.drift, ' +
    'category.id as category_id, ' +
    'category.name as category_name, ' +
    'category.icon as category_icon ' +
    'FROM properties ' +
    'LEFT JOIN category ' +
    ' ON properties.category_id = category.id ' +
    ' WHERE properties.active = 1',
    []
  )
  return result
}

const getForCategory = async (id) => {
  const result = await sql.execute(
    'SELECT properties.id, ' +
    'properties.name, ' +
    'properties.drift, ' +
    'properties.property_type, ' +
    'property_options.id as option_id, ' +
    'property_options.name as option_name, ' +
    'property_options.position as option_position ' +
    'FROM properties ' +
    'LEFT JOIN property_options ' +
    ' ON properties.id = property_options.properties_id ' +
    'WHERE properties.active = 1 ' +
    'AND properties.category_id = @id ' +
    'ORDER BY property_options.position ASC',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE properties ' +
    'SET name = @name, ' +
      'drift = @drift ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'drift', type: 'NVarChar', val: data.drift },
      { name: 'name', type: 'NVarChar', val: data.name }
    ]
  )
  return result
}

const putOptions = async (id, data) => {
  const result = await sql.execute(
    'UPDATE property_options ' +
    'SET name = @name, ' +
    'position = @position ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'position', type: 'NVarChar', val: data.position }
    ]
  )
  return result
}

const post = async (id, data) => {
  const result = await sql.execute(
    'INSERT INTO properties ' +
    '(id, category_id, name, property_type, active, drift) ' +
    'VALUES ' +
    '(@id, @categoryId, @name, @propertyType, 0, @drift)',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'propertyType', type: 'NVarChar', val: data.propertyType },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'drift', type: 'NVarChar', val: data.drift },
      { name: 'categoryId', type: 'NVarChar', val: data.categoryId }
    ]
  )
  return result
}

const activate = async (id) => {
  const result = await sql.execute(
    'UPDATE properties ' +
    'SET active = 1 ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const postOptions = async (data) => {
  const result = await sql.execute(
    'INSERT INTO property_options ' +
    '(id, properties_id, name, position) ' +
    'VALUES ' +
    '(NEWID(), @propertiesId, @name, @position)',
    [
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'position', type: 'NVarChar', val: data.position },
      { name: 'propertiesId', type: 'NVarChar', val: data.propertiesId }
    ]
  )
  return result
}

const remove = async (id) => {
  const result = await sql.execute(
    'UPDATE properties ' +
    'SET active = 0 ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const removeOptions = async (id) => {
  const result = await sql.execute(
    'DELETE property_options ' +
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
  getForCategory,
  put,
  putOptions,
  activate,
  post,
  postOptions,
  remove,
  removeOptions
}
