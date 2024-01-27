const express = require('express')
const app = express()
const userRouter = require ('./routes/userRouter')
const playlistRouter = require ('./routes/playlistRouter')
const songsRouter = require ('./routes/songsRouter')

app.use(express.json())

app.use('/users', userRouter)
app.use('/songs', songsRouter)
app.use('/playlist', playlistRouter)

module.exports = app