const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const User = require('../models/user')
const Playlist = require('../models/playlist')
const Songs = require('../models/songs')

let mongoServer
let authToken
let user

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())

  user = new User({ username: 'user', password: 'password' })
  await user.save()

  const response = await request(app)
    .post('/users/login')
    .send({ username: 'user', password: 'password' })

  authToken = response.body.token
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
})

describe('playlist endpoints', () => {

  test('should create a new playlist & add to user', async () => {
    const response = await request(app)
      .post('/playlist')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'playlist', genre: 'genre' })
  
    expect(response.statusCode).toBe(201)
  
    const updatedUser = await User.findOne({ _id: user._id })
    expect(updatedUser.playlists).toHaveLength(1)
    expect(updatedUser.playlists[0]).toBeInstanceOf(mongoose.Types.ObjectId)
  })

  test('should get a list of playlists', async () => {
    const response = await request(app)
      .get('/playlist');

    expect(response.statusCode).toBe(200)
  })

  test('should show a playlist', async () => {
    const playlist = new Playlist({ userId: user._id, name: 'siiiiiick', genre: 'house' })
    await playlist.save();

    const response = await request(app)
      .get(`/playlist/${playlist._id}`)

    expect(response.statusCode).toBe(200)
  })

  test('should add a song to a playlist', async () => {
    const song = new Songs({ artistName: 'gorillas', songName: 'gorillas literally running all over the place' })
    const playlist = new Playlist({ userId: user._id, name: 'Dub 2021', genre: 'dubstep' })
    await Promise.all([song.save(), playlist.save()])
  
    const response = await request(app)
      .post(`/playlist/${playlist._id}/songs/${song._id}`)
      .set('Authorization', `Bearer ${authToken}`)
  
    expect(response.status).toBe(200)
    expect(response.body.msg).toEqual(
      `associated ${song._id} with ${playlist._id} playlist`
    )
  })

  test('should update a playlist', async () => {
    const playlist = new Playlist({ userId: user._id, name: 'loud music', genre: 'grunge' })
    await playlist.save()

    const response = await request(app)
      .put(`/playlist/${playlist._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ genre: 'updated the genre' })

    expect(response.statusCode).toBe(200)
  })
})