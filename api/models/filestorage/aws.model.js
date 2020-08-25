const fs = require('fs')
const AWS = require('aws-sdk')

const getURL = (folder, name) => {
  return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${name}`
}

const upload = async (file, folder, name, ACL) => {
  await fs.readFile(file, async (err, data) => {
    if (err) {
      fs.unlink(file, (err) => {
        if (err) {
          console.log(err)
        }
      })
      throw err
    }
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_USER,
      secretAccessKey: process.env.AWS_KEY,
      region: process.env.AWS_REGION
    })
    await s3.upload({
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${name}`,
      Body: data,
      ACL: (ACL || 'public-read')
    }, (s3Err, data) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.log(err)
        }
      })
      if (s3Err) {
        throw s3Err
      }
    })
  })
}

module.exports = {
  upload,
  getURL
}
