const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')

router.post('/', playlistController.create)
router.get('/', playlistController.index)



module.exports = router
//index of playlists
//delete playlist
//update playlist
//create playlist
//show playlist