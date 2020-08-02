const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

test('JWT: Verify if Auth token can get Refresh token', async done => {
  const resToken = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: 'GoGoEstera' })
    .set('Accept', 'application/json')

  const res = await request
    .get('/jwt/refresh')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resToken.body.token)
    .expect('Content-Type', /json/)
  expect(res.status).toBe(200)
  done()
})

test('JWT: Verify if Refresh token can\'t get Refresh token', async done => {
  const resToken = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: 'GoGoEstera' })
    .set('Accept', 'application/json')

  const resAuth = await request
    .get('/jwt/refresh')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resToken.body.token)
    .expect('Content-Type', /json/)

  const res = await request
    .get('/jwt/refresh')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resAuth.body.token)
    .expect('Content-Type', /json/)
  expect(res.status).toBe(400)
  done()
})


test('JWT: session logout', async done => {
  const resToken = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: 'GoGoEstera' })
    .set('Accept', 'application/json')

  const resAuth = await request
    .get('/jwt/refresh')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resToken.body.token)
    .expect('Content-Type', /json/)

  const res = await request
    .get('/jwt/logout/session')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resAuth.body.token)
    .expect('Content-Type', /json/)
  expect(res.status).toBe(200)
  done()
})

test('JWT: user logout', async done => {
  const resToken = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: 'GoGoEstera' })
    .set('Accept', 'application/json')

  const resAuth = await request
    .get('/jwt/refresh')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resToken.body.token)
    .expect('Content-Type', /json/)

  const res = await request
    .get('/jwt/logout/user')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resAuth.body.token)
    .expect('Content-Type', /json/)
  expect(res.status).toBe(200)
  done()
})


