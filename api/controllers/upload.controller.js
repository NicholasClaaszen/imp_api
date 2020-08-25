const uploadRouter = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const daoStorage = require(`../models/filestorage/${process.env.FILESTORAGE}.model`)
const { v4: uuidv4 } = require('uuid')
const mime = require('mime-types')

uploadRouter.post('/image', upload.single('item_image'), async (req, res, next) => {
  const ext = mime.extension(req.file.mimetype)
  const name = `${uuidv4()}.${ext}`
  await daoStorage.upload(req.file.path, 'images', name)
  const url = daoStorage.getURL('images', name)
  return res.status(200).json({ url })
})

module.exports = uploadRouter
