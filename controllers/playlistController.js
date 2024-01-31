const Playlist = require ('../models/playlist')
const Songs = require ('../models/songs')
const User = require('../models/user')

exports.create = async (req, res) => {
  try {
    const createdPlaylist = await Playlist.create(req.body)
    req.user.playlists.push(createdPlaylist._id)
    await req.user.save()
    res.status(201).json(createdPlaylist)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.index = async (req, res) => {
  try {
    const foundPlaylists = await Playlist.find(req.body)
    res.status(200).json(foundPlaylists)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.show = async (req, res) => {
    try {
        const foundPlaylist = await Playlist.findOne({_id: req.params.id})
        res.status(200).json(foundPlaylist)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.addSong = async (req, res) => {
  try {
    const foundSong = await Songs.findOne({ _id: req.params.songId })
    if (!foundSong) throw new Error(`could not locate the song ${req.params.songId}`)

    const foundPlaylist = await Playlist.findOne({ _id: req.params.playlistId })
    if (!foundPlaylist) throw new Error(`could not locate the playlist ${req.params.playlistId}`)
    if (foundPlaylist.trackInfo.includes(foundSong._id)) {
      return res.status(400).json({ msg: `song ${req.params.songId} is currently in the playlist` })
    }

    foundPlaylist.trackInfo.push(foundSong._id);

    await foundPlaylist.save();

    res.status(200).json({
      msg: `associated ${req.params.songId} with ${req.params.playlistId} playlist`,
      playlist: foundPlaylist,
      song: foundSong
    })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { genre, trackInfo } = req.body

  try {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' })
    }

    playlist.genre = genre
    playlist.trackInfo = trackInfo;

    await playlist.save()

    res.status(200).json({ message: 'playlist updated', playlist })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'error' })
  }
}