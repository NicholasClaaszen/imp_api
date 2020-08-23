const { v4: uuidv4 } = require('uuid');
const propertyRouter = require('express').Router()
const daoProperty = require('../models/property.model')
const daoUser = require('../models/user.model')

/*
* Property bits
* */
propertyRouter.get('/', async (req, res, next) => {
  const properties = await daoProperty.getAll()
  return res.status(200).json(properties.recordset)
})

propertyRouter.post('/', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.categoryId === undefined || req.body.categoryId.length === 0) {
    return res.status(400).json({ error: 'missing_categoryId' })
  }
  if (req.body.propertyType === undefined || req.body.propertyType.length === 0) {
    return res.status(400).json({ error: 'missing_propertyType' })
  }
  if (!['toggle', 'select_one', 'select_multiple', 'free_text'].includes(req.body.propertyType)) {
    return res.status(400).json({ error: 'unknown_propertyType' })
  }
  if (req.body.drift === undefined) {
    req.body.drift = 0
  }
  const id = uuidv4()
  await daoProperty.post(id, req.body)
  return res.status(200).json({id})
})

propertyRouter.get('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  const properties = await daoProperty.get(req.params.id)
  if (properties.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(properties.recordset)
})

propertyRouter.put('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.drift === undefined) {
    req.body.drift = 0
  }
  await daoProperty.put(req.params.id, req.body)
  return res.status(200).json('OK')
})

propertyRouter.patch('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoProperty.activate(req.params.id)
  return res.status(200).json('OK')
})

propertyRouter.delete('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoProperty.remove(req.params.id)
  return res.status(200).json('OK')
})

/*
* Property Option bits
* */
propertyRouter.post('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.position === undefined || req.body.position.length === 0) {
    return res.status(400).json({ error: 'missing_position' })
  }
  req.body.propertiesId = req.params.id
  await daoProperty.postOptions(req.body)
  return res.status(200).json('OK')
})

propertyRouter.put('/:id/:subid', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.position === undefined || req.body.position.length === 0) {
    return res.status(400).json({ error: 'missing_position' })
  }
  await daoProperty.putOptions(req.params.subid, req.body)
  return res.status(200).json('OK')
})

propertyRouter.delete('/:id/:subid', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoProperty.removeOptions(req.params.subid)
  return res.status(200).json('OK')
})

module.exports = propertyRouter
