const Playlist = require ('../models/playlist')
const Songs = require ('../models/songs')

exports.create = async (req, res) => {
    try {
        const createdPlaylist = await Playlist.create(req.body)
        res.status(200).json(createdPlaylist)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.index = async (req, res) => {
    try {
        const foundPlaylists = await Playlist.find(req.body)
        res.status(200).json(foundPlaylists)
    }
    catch(error){
        res.status(400).json({msg: error.message})
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
        const foundSong = await Song.findOne ({_id: req.params.songId})
        if(!foundSong) throw new Error (`could no locate the song with the id of ${req.params.songId}`)
        const foundPlaylist = await Playlist.findOne ({_id: req.params.playlistId})
        if(!foundPlaylist) throw new Error (`could no locate the playlist with the id of ${req.params.playlistId}`)
        //many to many
        foundPlaylist.cast.push(foundPlaylist._id) //change cast
        foundSong.credits.push(foundPlaylist._id) //change credits
        await foundMovie.save()
        await foundSong.save()
        res.status(200).json({
            msg: `successfully associated song with id ${req.params.songId} with playlist ${req.params.playlistId}`,
            playlist: foundPlaylist,
            song: foundSong
    
        })
    } catch(error){
        res.status(400).json({msg: error.message})
    }
}