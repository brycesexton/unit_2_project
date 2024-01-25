const express = require('express')
const app = express()
const userRouter = require ('./routes/userRouter')
const playlistRouter = require ('./routes/playlistRouter')

app.use(express.json())
app.use('/users', userRouter)
app.use('/playlists', playlistRouter)

module.exports = app