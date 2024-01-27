const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const User = require('../models/user')

let mongoServer;


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true })
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
})

describe('endpoints', () => {
  test('It should create a user', async () => {
    const response = await request(app)
        .post('/users')
        .send({ username: 'test 1234', password: 'p1213rd' })
        console.log(response.body)
    expect(response.statusCode).toBe(200)
    // expect(response.body.user.username).toEqual('username')
    expect(response.body).toHaveProperty('token')
})

  test('should login a user', async () => {
    const user = new User({ username: 'username', password: 'password' })
    await user.save()

    const response = await request(app)
      .post('/users/login')
      .send({ username: 'username', password: 'password' })

    expect(response.statusCode).toBe(200)
  })

  test('should update a user', async () => {
    const user = new User({ username: 'username', password: 'password' })
    await user.save()

    const response = await request(app)
      .put(`/users/${user._id}`)
      .send({ username: 'updated username' })

    expect(response.statusCode).toBe(200)
  })

  test('should delete a user', async () => {
    const user = new User({ username: 'use1231', password: 'pass123123rd' })
    await user.save()
    const token = user.generateAuthToken ()
    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      console.log(response)

    expect(response.statusCode).toBe(204)
  })
})