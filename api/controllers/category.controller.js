const categoryRouter = require('express').Router()
const daoCategory = require(`../models/${process.env.DB_TYPE}/category.model`)
const daoProperty = require(`../models/${process.env.DB_TYPE}/property.model`)
const daoUser = require(`../models/${process.env.DB_TYPE}/user.model`)

categoryRouter.get('/', async (req, res, next) => {
  const categories = await daoCategory.getAll()
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

categoryRouter.get('/:id', async (req, res, next) => {
  const categories = await daoCategory.get(req.params.id)
  if (categories.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(categories.recordset[0])
})

categoryRouter.get('/:id/properties', async (req, res, next) => {
  const properties = await daoProperty.getForCategory(req.params.id)
  return res.status(200).json(properties.recordset)
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
