const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

test('Account: Change Password', async done => {
  const resToken = await request
    .post('/login')
    .send({ email: 'password@imp.com', password: 'G0G0!Estera' })
    .set('Accept', 'application/json')
  expect(resToken.status).toBe(200)

  const resAuth = await request
    .get('/jwt/refresh')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resToken.body.token)
    .expect('Content-Type', /json/)
  expect(resAuth.status).toBe(200)

  const resWrong = await request
    .post('/user/password')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resAuth.body.token)
    .send({ password: 'EsteraGoGo' })
    .expect('Content-Type', /json/)
  expect(resWrong.status).toBe(400)

  const res = await request
    .post('/user/password')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + resAuth.body.token)
    .send({ password: 'EsteraG0G0!' })
    .expect('Content-Type', /json/)
  expect(res.status).toBe(200)

  setTimeout(async () => {
    const resTokenB = await request
      .post('/login')
      .send({ email: 'password@imp.com', password: 'EsteraG0G0!' })
      .set('Accept', 'application/json')
    expect(resTokenB.status).toBe(200)

    const resAuthB = await request
      .get('/jwt/refresh')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + resTokenB.body.token)
      .expect('Content-Type', /json/)
    expect(resAuthB.status).toBe(200)

    const resB = await request
      .post('/user/password')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + resAuthB.body.token)
      .send({ password: 'G0G0!Estera' })
      .expect('Content-Type', /json/)
    expect(resB.status).toBe(200)

    done()
  }, 500)
})
