const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    genre: {type: String, required: true},
    trackInfo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Songs'}] 
  })
  
  const Playlist = mongoose.model('Playlist', playlistSchema)
  
  module.exports = Playlist

  //65b9befb48c2249b3e3d5c01
  ///eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI5YmMwYTA3Y2UzNjUxY2FhMWEyODciLCJpYXQiOjE3MDY2NzE5NDd9.CrQU1uyK-SyhcATt9mgvNJ99x6XtFn3K5t_5a0ivf0A