const Playlist = require ('../models/playlist')
const Songs = require ('../models/songs')

exports.create = async (req, res) => {
  try {
    const createdPlaylist = await Playlist.create(req.body)
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
    if (!foundSong) throw new Error(`Could not locate the song with the id of ${req.params.songId}`)

    const foundPlaylist = await Playlist.findOne({ _id: req.params.playlistId })
    if (!foundPlaylist) throw new Error(`Could not locate the playlist with the id of ${req.params.playlistId}`)
    if (foundPlaylist.trackInfo.includes(foundSong._id)) {
      return res.status(400).json({ msg: `Song with id ${req.params.songId} is already in the playlist` })
    }

    foundPlaylist.trackInfo.push(foundSong._id);

    await foundPlaylist.save();

    res.status(200).json({
      msg: `Successfully associated song with id ${req.params.songId} with playlist ${req.params.playlistId}`,
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
      return res.status(404).json({ message: 'Playlist not found' })
    }

    playlist.genre = genre
    playlist.trackInfo = trackInfo;

    await playlist.save()

    res.status(200).json({ message: 'Playlist updated', playlist })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'error' })
  }
}
