const mongoose = require('mongoose')

const PokemonSchema = mongoose.Schema({
  name: String,
  url: String
})

module.exports = mongoose.model('Pokemon', PokemonSchema)