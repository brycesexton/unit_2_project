const mongoose = require('mongoose')

const songsSchema = new mongoose.Schema({
    artistName: {type: String, required: true},
    songName: [{type: String, required: true}],
    trackInfo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}] 
  })
  
  const Songs = mongoose.model('Songs', songsSchema)
  
  module.exports = Songs
