const contactRouter = require('express').Router()
const daoContact = require(`../models/${process.env.DB_TYPE}/contact.model`)
const daoUser = require(`../models/${process.env.DB_TYPE}/user.model`)
const daoOrganisation = require(`../models/${process.env.DB_TYPE}/organisation.model`)

contactRouter.get('/', async (req, res, next) => {
  const contacts = await daoContact.getAll()
  return res.status(200).json(contacts.recordset)
})

contactRouter.post('/', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.email === undefined || req.body.email.length === 0) {
    return res.status(400).json({ error: 'missing_email' })
  }
  if (req.body.phone === undefined || req.body.email.phone === 0) {
    return res.status(400).json({ error: 'missing_phone' })
  }
  if (req.body.organisation === undefined || req.body.organisation.length === 0) {
    const organisation = await daoOrganisation.getDefault()
    req.body.organisationId = organisation.recordset[0].id
  }
  await daoContact.post(req.body)
  return res.status(200).json('OK')
})

contactRouter.get('/:id', async (req, res, next) => {
  const contacts = await daoContact.get(req.params.id)
  if (contacts.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(contacts.recordset[0])
})

contactRouter.put('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  if (req.body.name === undefined || req.body.name.length === 0) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (req.body.email === undefined || req.body.email.length === 0) {
    return res.status(400).json({ error: 'missing_email' })
  }
  if (req.body.phone === undefined || req.body.email.phone === 0) {
    return res.status(400).json({ error: 'missing_phone' })
  }
  await daoContact.put(req.params.id, req.body)
  return res.status(200).json('OK')
})

contactRouter.delete('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoContact.remove(req.params.id)
  return res.status(200).json('OK')
})

module.exports = contactRouter
