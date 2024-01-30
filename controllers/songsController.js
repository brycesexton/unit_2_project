const Songs = require('../models/songs')
const Playlist = require('../models/playlist')

exports.create = async (req, res) => {
  try {
    const createdSong = await Songs.create(req.body)
    res.status(201).json(createdSong)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.index = async (req, res) => {
  try {
    const foundSongs = await Songs.find(req.body)
    res.status(200).json(foundSongs)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.show = async (req, res) => {
  try {
    const foundSong = await Songs.findOne({ _id: req.params.id })

    if (!foundSong) {
      return res.status(404).json({ message: 'Song not found' })
    }

    res.status(200).json(foundSong)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { artistName, songName } = req.body

  try {
    const song = await Songs.findById(id)

    if (!song) {
      return res.status(404).json({ message: 'Song not found' })
    }
    if (artistName) {
      song.artistName = artistName
    }
    if (songName) {
      song.songName = songName
    }

    await song.save()

    res.status(200).json({ message: 'Song updated', song })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'error' })
  }
}