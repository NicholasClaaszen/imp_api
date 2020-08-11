const organisationRouter = require('express').Router()
const daoUser = require('../models/user.model')
const daoOrganisation = require('../models/organisation.model')

organisationRouter.get('/', async (req, res, next) => {
  const organisations = await daoOrganisation.getAll()
  return res.status(200).json(organisations.recordset)
})

organisationRouter.get('/:id', async (req, res, next) => {
  const organisations = await daoOrganisation.get(req.params.id)
  if (organisations.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(organisations.recordset[0])
})

organisationRouter.put('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.baseURL === undefined || req.body.baseURL.length === 0) {
    return res.status(400).json({ error: 'missing_baseURL' })
  }
  if (req.body.contactId === undefined || req.body.contactId.length === 0) {
    req.body.contactId = ''
  }
  await daoOrganisation.put(req.params.id, req.body)
  return res.status(200).json('OK')
})

module.exports = organisationRouter
