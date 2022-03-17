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
      res.status(result.status).json(result.data.results)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = PokemonController
