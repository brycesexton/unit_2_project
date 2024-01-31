const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const playlistController = require('../controllers/playlistController')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.get ('/profile', userController.auth, userController.showUser)
router.post('/playlist', userController.auth, playlistController.create)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)


module.exports = router