const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')
const userController = require ('../controllers/userController')

router.post('/', userController.auth, playlistController.create)
router.get('/', playlistController.index)
router.put('/:id', userController.auth, playlistController.update)
router.post('/:playlistId/songs/:songId', playlistController.addSong)
router.get('/:id', playlistController.show)

module.exports = router