const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: string,
})

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)
