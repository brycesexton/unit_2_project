const User = require ('../models/user')
const Playlist = require ('../models/playlist')


exports.create = async (req, res) => {
    try {
        const createdUser = await User.create(req.body)
        res.status(200).json(createdUser)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.index = async (req, res) => {
    try {
        const foundUsers = await User.find(req.body)
        res.status(200).json(foundUsers)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.show = async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id})
        // .populate('song genre')??? 
        res.status(200).json(foundUser)
    }
    catch(error){
        res.status(400).json({msg: error.message})
    }
}

exports.createPlaylist = async (req, res) => {
    try {
        const foundPlaylist = await Playlist.findOne ({_id: req.params.playlistId})
        if(!foundPlaylist) throw new Error (`could no locate the performer with the id of ${req.params.playlistId}`)
        const foundUser = await User.findOne ({_id: req.params.userId})
        if(!foundUser) throw new Error (`could no locate the movie with the id of ${req.params.userId}`)
        //many to many
        foundUser.playlist.push(foundPlaylist._id)
        foundPerformer.credits.push(foundM._id)
        await foundMovie.save()
        await foundPerformer.save()
        res.status(200).json({
            msg: `successfully associated playlist with id ${req.params.performerId} with movie ${req.params.movieId}`,
            movie: foundMovie,
            performer: foundPerformer
    
        })
    } catch(error){
        res.status(400).json({msg: error.message})
    }
}