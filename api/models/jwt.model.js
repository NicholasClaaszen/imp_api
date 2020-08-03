/*
* See: https://tools.ietf.org/html/rfc7519 for JWT spec
* */

const jwt = require('jsonwebtoken')
const sql = require('./sql.model')
const { v4: uuidv4 } = require('uuid')

const signRefresh = (user) => {
  const sessionID = uuidv4()
  sql.execute(
    'INSERT INTO users_session (id, users_id, starttime, active) VALUES (@id, @user, GETDATE(), 1)',
    [{
      name: 'id', type: 'UniqueIdentifier', val: sessionID
    }, {
      name: 'user', type: 'UniqueIdentifier', val: user.id
    }]
  )
  return jwt.sign({
    expiresIn: '7d',
    jwtid: sessionID,
    subject: user.id,
    audience: 'IMP+Refresh'
  }, process.env.JWT_KEY)
}

const signAuth = (user) => {
  return jwt.sign({
    expiresIn: '5m',
    jwtid: user.jwtid,
    subject: user.subject,
    audience: 'IMP+Auth'
  }, process.env.JWT_KEY)
}

const revokeByID = (id) => {
  sql.execute(
    'UPDATE users_session SET active = 0 WHERE id = @id',
    [{
      name: 'id', type: 'UniqueIdentifier', val: id
    }]
  )
}
const revokeByUser = (id) => {
  sql.execute(
    'UPDATE users_session SET active = 0 WHERE users_id = @id',
    [{
      name: 'id', type: 'UniqueIdentifier', val: id
    }]
  )
}

const isTokenRevoked = async (req, payload, done) => {
  const result = await sql.execute(
    'SELECT * FROM users_session WHERE id = @id AND users_id = @user AND active = 1',
    [{
      name: 'id', type: 'UniqueIdentifier', val: payload.jwtid
    }, {
      name: 'user', type: 'UniqueIdentifier', val: payload.subject
    }]
  )
  /* Return 'revoked' if session not found */
  if (result.recordset.length === 0) {
    console.log(result)
    console.log(payload)
    return done(null, true)
  }
  /* Otherwise, return 'unrevoked' */
  return done(null, false)
}

module.exports = {
  isTokenRevoked,
  signRefresh,
  signAuth,
  revokeByID,
  revokeByUser
}
