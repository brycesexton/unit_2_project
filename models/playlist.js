const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    genre: {type: String, required: true},
    trackInfo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Songs'}] 
  })
  
  const Playlist = mongoose.model('Playlist', playlistSchema)
  
  module.exports = Playlist