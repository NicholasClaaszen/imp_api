const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)
const dateExpr = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)

it('Login: Valid Data', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(200)
  expect(res.body.user.id).toBe('0BE85870-72F1-4200-94EC-4B37AA450A97')
  expect(res.body.user.name).toBe('Nicholas')
  expect(res.body.user.email).toBe('Nicholas@servicesites.nl')
  expect(dateExpr.test(res.body.user.regdate)).toBe(true)
  expect(dateExpr.test(res.body.user.lastlogindate)).toBe(true)
  expect(res.body.user.active).toBe(true)
  done()
})

it('Login: Invalid password', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: 'GoGoEsteraS' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(404)
  expect(res.body.error).toBe('User not found')
  done()
})

it('Login: Invalid email', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nls', password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(404)
  expect(res.body.error).toBe('User not found')
  done()
})

it('Login: Missing password', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('password required')
  done()
})

it('Login: Empty password', async done => {
  const res = await request
    .post('/login')
    .send({ email: 'Nicholas@servicesites.nl', password: '' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('password required')
  done()
})

it('Login: Missing email', async done => {
  const res = await request
    .post('/login')
    .send({ password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('email required')
  done()
})
it('Login: Empty email', async done => {
  const res = await request
    .post('/login')
    .send({ email: '', password: 'GoGoEstera' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  expect(res.status).toBe(400)
  expect(res.body.error).toBe('email required')
  done()
})
