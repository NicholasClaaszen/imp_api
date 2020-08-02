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

const execute = async (queryString, inputs) => {
  const pool = await sql.connect(config)
  const request = await pool.request()
  inputs.forEach(element => {
    request.input(element.name, sql[element.type], element.val)
  })
  const response = await request.query(queryString)
  pool.close()
  return response
}

sql.on('error', err => {
  console.log(err)
})

module.exports = {
  execute
}
