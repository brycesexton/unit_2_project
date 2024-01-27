const express = require('express')
const app = express()
const userRouter = require ('./routes/userRouter')
const playlistRouter = require ('./routes/playlistRouter')
const songsRouter = require ('./routes/songsRouter')

app.use('/users', userRouter);
app.use('/songs', songsRouter);
app.use('/playlists', playlistRouter);

module.exports = app