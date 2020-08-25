const itemRouter = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const daoItem = require(`../models/${process.env.DB_TYPE}/item.model`)
const daoUser = require(`../models/${process.env.DB_TYPE}/user.model`)

/*
* item bits
* */
itemRouter.get('/', async (req, res, next) => {
  const properties = await daoItem.getAll()
  return res.status(200).json(properties.recordset)
})

itemRouter.post('/', async (req, res, next) => {
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
  if (req.body.storageContainerId === undefined || req.body.storageContainerId.length === 0) {
    return res.status(400).json({ error: 'missing_storageContainerId' })
  }
  if (req.body.dirty === undefined || req.body.dirty.length === 0) {
    return res.status(400).json({ error: 'missing_dirty' })
  }
  if (req.body.broken === undefined || req.body.broken.length === 0) {
    return res.status(400).json({ error: 'missing_broken' })
  }
  if (req.body.inUse === undefined || req.body.inUse.length === 0) {
    return res.status(400).json({ error: 'missing_inUse' })
  }
  if (req.body.tag === undefined || req.body.tag.length === 0) {
    req.body.tag = ''
  }
  if (req.body.imageUrl === undefined || req.body.imageUrl.length === 0) {
    return res.status(400).json({ error: 'missing_imageUrl' })
  }
  const id = uuidv4()
  await daoItem.post(id, req.body)

  if (req.body.options !== undefined) {
    await daoItem.removeOptions(id)
    for (const option of req.body.options) {
      await daoItem.postOptions(id, option)
    }
  }

  return res.status(200).json({ id })
})

itemRouter.get('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  const properties = await daoItem.get(req.params.id)
  if (properties.recordset.length === 0) {
    return res.status(404).json({ error: 'not_found' })
  }
  return res.status(200).json(properties.recordset)
})

itemRouter.put('/:id', async (req, res, next) => {
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
  if (req.body.storageContainerId === undefined || req.body.storageContainerId.length === 0) {
    return res.status(400).json({ error: 'missing_storageContainerId' })
  }
  if (req.body.dirty === undefined || req.body.dirty.length === 0) {
    return res.status(400).json({ error: 'missing_dirty' })
  }
  if (req.body.broken === undefined || req.body.broken.length === 0) {
    return res.status(400).json({ error: 'missing_broken' })
  }
  if (req.body.inUse === undefined || req.body.inUse.length === 0) {
    return res.status(400).json({ error: 'missing_inUse' })
  }
  if (req.body.tag === undefined || req.body.tag.length === 0) {
    req.body.tag = ''
  }
  if (req.body.imageUrl === undefined || req.body.imageUrl.length === 0) {
    return res.status(400).json({ error: 'missing_imageUrl' })
  }
  await daoItem.put(req.params.id, req.body)

  if (req.body.options !== undefined) {
    await daoItem.removeOptions(req.params.id)
    for (const option of req.body.options) {
      await daoItem.postOptions(req.params.id, option)
    }
  }

  return res.status(200).json('OK')
})

itemRouter.delete('/:id', async (req, res, next) => {
  const hasRole = await daoUser.hasRole(req.user.subject, 'organisation', null)
  if (!hasRole) {
    return res.status(403).json({ error: 'missing_role' })
  }
  await daoItem.remove(req.params.id)
  return res.status(200).json('OK')
})

module.exports = itemRouter
