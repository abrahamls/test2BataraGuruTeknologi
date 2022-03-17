const Pokemon = require('../models/pokemons')
const axios = require('axios')

class PokemonController {
  static async getPokemons(req, res, next) {
    try {
      let offset = 0
      if (!req.query.page || req.query.page == 0 || req.query.page == 1) {
        offset = 0
      } else {
        offset = req.query.page * 10
      }
      const result = await axios({
        method: 'get',
        url: `${process.env.POKE_API}?offset=${offset}&limit=10`
      })
      const samplePokemon = await Pokemon.findOne({ name: result.data.results[0].name }) //to check if the api has already been called before by checking the name of the pokemon 
      if (samplePokemon) {
        res.status(200).json({ message: "API ini sudah dihit sebelumnya, dan sudah tersimpan ke database MongoDB" })
      } else {
        await Pokemon.insertMany(result.data.results)
        res.status(201).json({ message: "API ini belum dihit sebelumnya, dan data akan tersimpan ke database MongoDB" })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PokemonController
