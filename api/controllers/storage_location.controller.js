const storageLocationRouter = require('express').Router()
const daoStorageLocation = require(`../models/${process.env.DB_TYPE}/storage_location.model`)
const daoStorageContainer = require(`../models/${process.env.DB_TYPE}/storage_container.model`)
const daoUser = require(`../models/${process.env.DB_TYPE}/user.model`)
const daoOrganisation = require(`../models/${process.env.DB_TYPE}/organisation.model`)

storageLocationRouter.get('/', async (req, res, next) => {
  const locations = await daoStorageLocation.getAll()
  return res.status(200).json(locations.recordset)
})

storageLocationRouter.post('/', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.address === undefined || req.body.address.length === 0) {
    return res.status(400).json({ error: 'missing_address' })
  }
  if (req.body.contactId === undefined || req.body.contactId.length === 0) {
    req.body.contactId = ''
  }
  const organisation = await daoOrganisation.getDefault()
  req.body.organisationId = organisation.recordset[0].id
  await daoStorageLocation.post(req.body)
  return res.status(200).json('OK')
})

storageLocationRouter.get('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  const locations = await daoStorageLocation.get(req.params.id)
  if (locations.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(locations.recordset[0])
})

/*
* Get all the containers in this location
* */
storageLocationRouter.get('/:id/containers', async (req, res, next) => {
  const containers = await daoStorageContainer.getPerLocation(req.params.id)
  if (containers.recordset.length === 0) {
    return res.status(404).json({ error: 'empty' })
  }
  return res.status(200).json(containers.recordset)
})

storageLocationRouter.put('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.address === undefined || req.body.address.length === 0) {
    return res.status(400).json({ error: 'missing_address' })
  }
  await daoStorageLocation.put(req.params.id, req.body)
  return res.status(200).json('OK')
})

storageLocationRouter.delete('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoStorageLocation.remove(req.params.id)
  return res.status(200).json('OK')
})

module.exports = storageLocationRouter
