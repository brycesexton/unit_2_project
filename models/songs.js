const mongoose = require('mongoose')

const songsSchema = new mongoose.Schema({
    artist: {type: String, required: true},
    songName: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}] //check this
  })
  
  const Songs = mongoose.model('Songs', songsSchema)
  
  module.exports = Songs


