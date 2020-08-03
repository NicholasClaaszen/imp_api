/*
* Datatype reference: https://www.npmjs.com/package/mssql#data-types
* */
const sql = require('mssql')
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  port: parseFloat(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
}

const pool = new sql.ConnectionPool(config)
const connection = pool.connect()

const execute = async (queryString, inputs) => {
  await connection
  const request = pool.request()
  inputs.forEach(element => {
    request.input(element.name, sql[element.type], element.val)
  })
  const response = await request.query(queryString)
  return response
}

pool.on('error', err => {
  console.log(err)
})

module.exports = {
  execute
}
