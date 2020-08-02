const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

it('Test to see if home ("dummy") works.', async done => {
  const res = await request.get('/home')

  expect(res.status).toBe(200)
  expect(res.body.message).toBe('This endpoint is empty')
  done()
})

it('Test to see if Not Found works - should return 401 for obscurity', async done => {
  const res = await request.get('/404')

  expect(res.status).toBe(401)
  done()
})
