require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  playlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}] 
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next();
});

userSchema.methods.generateAuthToken = function() {
  const secretKey = process.env.JWT_SECRET 
  const token = jwt.sign({ _id: this._id }, secretKey)
  return token;
};

const User = mongoose.model('User', userSchema)

module.exports = User;