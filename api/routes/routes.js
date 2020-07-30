module.exports = function (app) {
  const cLogin = require('../controllers/login.controller')
  const dummy = require('../controllers/dummy.controller')

  app.route('/home')
    .get(dummy.home)

  app.route('/login')
    .post(cLogin.login)

  app.use(function (req, res) {
    res.sendStatus(404)
  })
}
