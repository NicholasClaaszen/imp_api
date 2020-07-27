const jwt = require('jsonwebtoken')

exports.login = function (req, res) {
  const token = jwt.sign({ foo: 'bar' }, process.env.JWT_KEY)
  res.json({ token: token })
}
