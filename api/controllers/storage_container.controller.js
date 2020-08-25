const storageContainerRouter = require('express').Router()
const daoStorageContainer = require(`../models/${process.env.DB_TYPE}/storage_container.model`)
const daoOrganisation = require(`../models/${process.env.DB_TYPE}/organisation.model`)
const daoUser = require(`../models/${process.env.DB_TYPE}/user.model`)

storageContainerRouter.get('/', async (req, res, next) => {
  const containers = await daoStorageContainer.getAll()
  return res.status(200).json(containers.recordset)
})

storageContainerRouter.post('/', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.description === undefined || req.body.description.length === 0) {
    req.body.description = ''
  }
  if (req.body.locationId === undefined || req.body.locationId.length === 0) {
    return res.status(400).json({ error: 'missing_location' })
  }
  const organisation = await daoOrganisation.getDefault()
  req.body.organisationId = organisation.recordset[0].id
  await daoStorageContainer.post(req.body)
  return res.status(200).json('OK')
})

storageContainerRouter.get('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  const containers = await daoStorageContainer.get(req.params.id)
  if (containers.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(containers.recordset[0])
})

storageContainerRouter.put('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.description === undefined || req.body.description.length === 0) {
    req.body.description = ''
  }
  if (req.body.locationId === undefined || req.body.locationId.length === 0) {
    return res.status(400).json({ error: 'missing_location' })
  }
  await daoStorageContainer.put(req.params.id, req.body)
  return res.status(200).json('OK')
})

storageContainerRouter.delete('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoStorageContainer.remove(req.params.id)
  return res.status(200).json('OK')
})

module.exports = storageContainerRouter
