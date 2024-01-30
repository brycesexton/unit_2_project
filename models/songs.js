const mongoose = require('mongoose')

const songsSchema = new mongoose.Schema({
    artistName: {type: String, required: true},
    songName: {type: String, required: true}
  })
  
  const Songs = mongoose.model('Songs', songsSchema)
  
  module.exports = Songs
