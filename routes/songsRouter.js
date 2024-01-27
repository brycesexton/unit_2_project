const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songsController')

router.post('/', songsController.create)
router.get('/', songsController.index)
router.put('/:id', songsController.update)
router.get('/:songId/playlist/playlistId', songsController.addPlaylist)
router.get('/:id', songsController.show)



module.exports = router