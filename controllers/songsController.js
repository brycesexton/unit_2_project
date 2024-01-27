const Songs = require ('../models/songs')
const Playlist = require ('../models/playlist')


exports.create = async (req, res) => {
    try {
        const createdSong = await Song.create(req.body)
        res.status(200).json(createdSong)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.index = async (req, res) => {
    try {
        const foundSongs = await Song.find(req.body)
        res.status(200).json(foundSongs)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.show = async (req, res) => {
    try {
        const foundSong = await Song.findOne({_id: req.params.id})
        res.status(200).json(foundSong)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.addSong = async (req, res) => {
    try {
        const foundSong = await Songs.findOne({_id: req.params.songId})
        if (!foundSong) throw new Error(`Could not locate the song with the id of ${req.params.songId}`)

        const foundPlaylist = await Playlist.findOne({_id: req.params.playlistId})
        if (!foundPlaylist) throw new Error(`Could not locate the playlist with the id of ${req.params.playlistId}`)

        // Many-to-Many Relationship
        foundPlaylist.trackInfo.push(foundSong._id)
        foundSong.trackInfo.push(foundPlaylist._id)

        await foundPlaylist.save()
        await foundSong.save()

        res.status(200).json({
            msg: `Successfully associated song with id ${req.params.songId} with playlist ${req.params.playlistId}`,
            playlist: foundPlaylist,
            song: foundSong
        })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
