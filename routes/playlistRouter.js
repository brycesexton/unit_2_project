const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')

router.post('/', playlistController.create)
router.get('/', playlistController.index)
router.put('/:id', playlistController.update)
router.get('/:playlistId/songs/songId', playlistController.addSong)
router.get('/:id', playlistController.show)



module.exports = router

