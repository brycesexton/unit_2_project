const request = require('supertest')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Playlist = require('../models/playlist')
const Songs = require('../models/songs')
const User = require('../models/user')

let mongoServer
let authToken
let user
    
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
    
    user = new User({ username: 'user', password: 'password' })
    await user.save();
    
    const response = await request(app)
    .post('/users/login')
    .send({ username: 'user', password: 'password' })
    
    authToken = response.body.token;
})
    
afterAll(async () => {
    await mongoose.connection.close()
    await mongoServer.stop()
})


describe('songs endpoints', () => {
  test('should show a song', async () => {
    const song = new Songs({ songName: 'Song Title', artistName: 'Artist' })
    await song.save()

    const response = await request(app).get(`/songs/${song._id}`)

    expect(response.status).toBe(200)
  })

  test('should update a song', async () => {
    const song = new Songs({ songName: 'Song Title', artistName: 'Artist' })
    await song.save()

    const response = await request(app)
      .put(`/songs/${song._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ artistName: 'Updated Artist' })

    expect(response.status).toBe(200)
  })
})