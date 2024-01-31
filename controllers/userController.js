const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: data._id })
    
    if (!user) {
      throw new Error('User not found')
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message })
  }
}

exports.showUser = async (req, res) => {
  try {
    const user = await User.find({_id:req.user._id})
    res.status(200).json(user)
  } 
  catch(error){
    res.status(400).json({ msg: "no user found" })
  }

}

exports.createUser = async (req, res) => {
  try{
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      throw new Error('invalid login attempt')
    } else {
      const token = await user.generateAuthToken()
      res.status(200).json({ user, token })
    }
  } catch (error) {
    res.status(401).json({ message: 'auth failed', error: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const user = await User.findOne({ _id: req.params.id })


    if (!user) {
      return res.status(404).json({ message: 'not found' })
    }

    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: 'failed to update', error: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne()
    res.status(204).json({ message: 'account deleted' })
  } catch (error) {
    res.status(400).json({ message: 'failed to delete user', error: error.message })
  }
}