const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)
const dateExpr = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)

test('Login: Valid Data', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'login@imp.com', password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(200)
  expect(res.body.user.id).toBe('19A5B0CE-7FB5-44F1-BC5A-4072781B5DCD')
  expect(res.body.user.name).toBe('test')
  expect(res.body.user.email).toBe('login@imp.com')
  expect(dateExpr.test(res.body.user.regdate)).toBe(true)
  expect(dateExpr.test(res.body.user.lastlogindate)).toBe(true)
  expect(res.body.user.active).toBe(true)
  done()
})

test('Login: Invalid password', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'login@imp.com', password: 'GoGoEsteraS' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(404)
  expect(res.body.error).toBe('User not found')
  done()
})

test('Login: Invalid email', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'login@imp.coms', password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(404)
  expect(res.body.error).toBe('User not found')
  done()
})

test('Login: Missing password', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'login@imp.com' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('password required')
  done()
})

test('Login: Empty password', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'login@imp.com', password: '' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('password required')
  done()
})

test('Login: Missing email', async done => {
  const res = await request
    .post('/login')
    .send({ password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('email required')
  done()
})

test('Login: Empty email', async done => {
  const res = await request
    .post('/login')
    .send({ email: '', password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('email required')
  done()
})