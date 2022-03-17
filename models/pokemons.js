const mongoose = require('mongoose')

const PokemonSchema = mongoose.Schema({
  name: string,
  url: string
})