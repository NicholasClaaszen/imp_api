const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

it('Test to see if 404 ("dummy") works.', async done => {
  const res = await request.get('/home')

  expect(res.status).toBe(200)
  expect(res.body.message).toBe('This endpoint is empty')
  done()
})
