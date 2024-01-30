const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/user');
const Playlist = require('../models/playlist');
const Songs = require('../models/songs');

let mongoServer;
let authToken;
let user;

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

describe('playlist endpoints', () => {
  test('should create a new playlist', async () => {
    const response = await request(app)
      .post('/playlist')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'playlist', genre: 'genre' })

    expect(response.statusCode).toBe(201)
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
      .post(`/playlist/${playlist._id}/songs`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ songId: song._id })
  
    console.log(response.body)
  
    expect(response.statusCode).toBe(200)
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