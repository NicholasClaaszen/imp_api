const homeRouter = require('express').Router()

homeRouter.get('/', (req, res, next) => {
  return res.json({ message: 'This endpoint is empty' })
})

module.exports = homeRouter
