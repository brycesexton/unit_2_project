const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songsController')
const userController = require ('../controllers/userController')

router.post('/', userController.auth, songsController.create)
router.get('/', songsController.index)
router.put('/:id', userController.auth, songsController.update)
router.get('/:playlistId/songs/:songId', songsController.addSong)
router.get('/:id', songsController.show)

module.exports = router