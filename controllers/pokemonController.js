const Pokemon = require('../models/pokemons')

class PokemonController {
  static async getPokemons(req, res, next) {
    try {
      let offset = 0
      let limit = 10  
      if (!req.query.page || req.query.page == 0 || req.query.page == 1) {
        offset = 0
      } else {
        offset = req.query.page * 10
      }
      res.status(200).json({ offset, limit })
    } catch (error) {
      console.log(error);   
    }
  }
}

module.exports = PokemonController

