const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: string,
  password: string
})

module.exports = mongoose.model('User', UserSchema)