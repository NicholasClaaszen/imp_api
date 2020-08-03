const sql = require('./sql.model')

const insert = (req) => {
  let id = ''
  if (req.user !== undefined) {
    id = req.user.subject
  }

  sql.execute(
    'INSERT INTO logging' +
      '(id, source, moment, query, body, users_id, url) ' +
      'VALUES' +
      '(NEWID(), @source, GETDATE(), @query, @body, @id, @url)',
    [
      { name: 'source', type: 'NVarChar', val: req.ip },
      { name: 'query', type: 'NVarChar', val: JSON.stringify(req.query) },
      { name: 'body', type: 'NVarChar', val: JSON.stringify(req.body) },
      { name: 'url', type: 'NVarChar', val: req.url.split('?')[0] },
      { name: 'id', type: 'NVarChar', val: id }
    ]
  )
  return true
}

module.exports = {
  insert
}
