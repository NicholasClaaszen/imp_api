describe ('Test JWT functions', () => {

  const app = require('../server')
  const supertest = require('supertest')
  const request = supertest(app)

  test('JWT: Verify if Auth token can get Refresh token', async done => {
    const resToken = await request
      .post('/login')
      .send({ email: 'jwt1@imp.com', password: 'GoGoEstera' })
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
      .send({ email: 'jwt2@imp.com', password: 'GoGoEstera' })
      .set('Accept', 'application/json')
    expect(resToken.status).toBe(200)

    const resAuth = await request
      .get('/jwt/refresh')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + resToken.body.token)
      .expect('Content-Type', /json/)
    expect(resAuth.status).toBe(200)

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
      .send({ email: 'jwt3@imp.com', password: 'GoGoEstera' })
      .set('Accept', 'application/json')
    expect(resToken.status).toBe(200)

    const resAuth = await request
      .get('/jwt/refresh')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + resToken.body.token)
      .expect('Content-Type', /json/)
    expect(resAuth.status).toBe(200)

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
      .send({ email: 'jwt4@imp.com', password: 'GoGoEstera' })
      .set('Accept', 'application/json')
    expect(resToken.status).toBe(200)

    const resAuth = await request
      .get('/jwt/refresh')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + resToken.body.token)
      .expect('Content-Type', /json/)
    expect(resAuth.status).toBe(200)

    const res = await request
      .get('/jwt/logout/user')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + resAuth.body.token)
      .expect('Content-Type', /json/)
    expect(res.status).toBe(200)
    done()
  })
})

