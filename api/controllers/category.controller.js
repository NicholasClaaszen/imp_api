const categoryRouter = require('express').Router()
const daoCategory = require('../models/category.model')
const daoUser = require('../models/user.model')

categoryRouter.get('/', async (req, res, next) => {
  const categories = await daoCategory.get()
  return res.status(200).json(categories.recordset)
})

categoryRouter.post('/', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.icon === undefined) {
    req.body.icon = ''
  }
  await daoCategory.post(req.body)
  return res.status(200).json('OK')
})

categoryRouter.put('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.icon === undefined) {
    req.body.icon = ''
  }
  await daoCategory.put(req.params.id, req.body)
  return res.status(200).json('OK')
})

categoryRouter.delete('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoCategory.remove(req.params.id)
  return res.status(200).json('OK')
})

module.exports = categoryRouter
