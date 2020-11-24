const sql = require('./sql.model')

const get = async (id) => {
  const result = await sql.execute(
    'SELECT item.id, ' +
    'item.storage_container_id, ' +
    'item.category_id, ' +
    'item.name, ' +
    'item.dirty, ' +
    'item.broken, ' +
    'item.in_use, ' +
    'item.tag_number, ' +
    'item.image_url, ' +
    'item_property_options.id AS prop_id, ' +
    'item_property_options.property_id AS prop_property_id, ' +
    'item_property_options.property_option_id AS prop_option_id, ' +
    'item_property_options.free_text AS prop_val ' +
    'FROM item ' +
    'INNER JOIN item_property_options ' +
    'ON item.id = item_property_options.item_id ' +
    'WHERE item.id  = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const getAll = async () => {
  const result = await sql.execute(
    'SELECT item.id, ' +
    'item.storage_container_id, ' +
    'item.category_id, ' +
    'item.name, ' +
    'item.dirty, ' +
    'item.broken, ' +
    'item.in_use, ' +
    'item.tag_number, ' +
    'item.image_url, ' +
    'category.name as category_name, ' +
    'storage_container.name as container_name,' +
    'storage_location.name as storage_name ' +
    'FROM item ' +
    'LEFT JOIN category ' +
    'ON item.category_id = category.id ' +
    'LEFT JOIN storage_container ' +
    'ON item.storage_container_id = storage_container.id ' +
    'LEFT JOIN storage_location ' +
    'ON storage_container.storage_location_id = storage_location.id ' +
    'WHERE item.active = 1 ' +
    'ORDER BY storage_location.name ASC, storage_container.name ASC, category.name ASC, item.name ASC',
    []
  )
  return result
}

const post = async (id, data) => {
  const result = await sql.execute(
    'INSERT INTO item ' +
    '(id, storage_container_id, category_id, name, dirty, broken, in_use, tag_number, image_url, active) ' +
    'VALUES ' +
    '(@id, @storageContainerId, @categoryId, @name, @dirty, @broken, @inUse, @tag, @imageUrl, 1)',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'storageContainerId', type: 'NVarChar', val: data.storageContainerId },
      { name: 'categoryId', type: 'NVarChar', val: data.categoryId },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'dirty', type: 'NVarChar', val: data.dirty },
      { name: 'broken', type: 'NVarChar', val: data.broken },
      { name: 'inUse', type: 'NVarChar', val: data.inUse },
      { name: 'tag', type: 'NVarChar', val: data.tag },
      { name: 'imageUrl', type: 'NVarChar', val: data.imageUrl }
    ]
  )
  return result
}

const postOptions = async (id, data) => {
  const result = await sql.execute('INSERT INTO item_property_options ' +
    '(id, item_id, property_id, property_option_id, free_text) ' +
    'VALUES ' +
    '(NEWID(), @itemId, @propertyId, @optionId, @freetext)',
  [
    { name: 'itemId', type: 'NVarChar', val: id },
    { name: 'propertyId', type: 'NVarChar', val: data.propertyId },
    { name: 'optionId', type: 'NVarChar', val: data.optionId },
    { name: 'freetext', type: 'NVarChar', val: data.freetext }
  ]
  )
  return result
}

const put = async (id, data) => {
  const result = await sql.execute(
    'UPDATE item ' +
    'SET storage_container_id = @storageContainerId, ' +
    'category_id = @categoryId, ' +
    'name = @name, ' +
    'dirty = @dirty, ' +
    'broken = @broken, ' +
    'in_use = @inUse, ' +
    'tag_number = @tag, ' +
    'image_url = @imageUrl ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id },
      { name: 'storageContainerId', type: 'NVarChar', val: data.storageContainerId },
      { name: 'categoryId', type: 'NVarChar', val: data.categoryId },
      { name: 'name', type: 'NVarChar', val: data.name },
      { name: 'dirty', type: 'NVarChar', val: data.dirty },
      { name: 'broken', type: 'NVarChar', val: data.broken },
      { name: 'inUse', type: 'NVarChar', val: data.inUse },
      { name: 'tag', type: 'NVarChar', val: data.tag },
      { name: 'imageUrl', type: 'NVarChar', val: data.imageUrl }
    ]
  )
  return result
}

const remove = async (id) => {
  const result = await sql.execute(
    'UPDATE item ' +
    'SET active = 0 ' +
    'WHERE id = @id',
    [
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return result
}

const removeOptions = async (id) => {
  const result = await sql.execute('DELETE ' +
    'FROM item_property_options ' +
    'WHERE item_id = @itemId',
  [
      { name: 'itemId', type: 'NVarChar', val: id }
    ]
  )
  return result
}

module.exports = {
  get,
  getAll,
  put,
  post,
  postOptions,
  remove,
  removeOptions
}
