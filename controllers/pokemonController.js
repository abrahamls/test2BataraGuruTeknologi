const Pokemon = require('../models/pokemons')
const axios = require('axios')
const redis = require('../config')

class PokemonController {
  static async getPokemons(req, res, next) {
    try {
      let offset = 0
      let page = req.query.page
      if (!page || page == 1) {
        offset = 0
      } else {
        offset = page * 10
      }
      const pokemonCache = await redis.get(`pokemons`)
      //check if pokemons already cached

      if (pokemonCache) {
        const cachedPokemon = JSON.parse(pokemonCache).map((el) => {
          if (el.page == page) {
            return el
          }
        })
        if (cachedPokemon[0]) {
          res.status(200).json(cachedPokemon)
        } else {
          const result = await axios({
            method: 'get',
            url: `${process.env.POKE_API}?offset=${offset}&limit=10`,
          })
          result.data.results.forEach((el) => (el.page = page))
          const pokemonsToCache = result.data.results
          await redis.set('pokemons', JSON.stringify(pokemonsToCache))
          await Pokemon.insertMany(result.data.results)
          console.log(result.data.results);
          res.status(200).json(pokemonsToCache)
        }
      } else {
        const result = await axios({
          method: 'get',
          url: `${process.env.POKE_API}?offset=${offset}&limit=10`,
        })
        result.data.results.forEach((el) => (el.page = page))
        const pokemonsToCache = result.data.results
        await redis.set('pokemons', JSON.stringify(pokemonsToCache))
        await Pokemon.insertMany(result.data.results)
        console.log(result.data.results);

        res.status(200).json(pokemonsToCache)
      }
    } catch (error) {
      next(error)
    }
  }
  static async getPokemonDetail(req, res, next) {
    try {
      const name = req.params.pokemonName
      const foundPokemon = await Pokemon.findOne({ name })
      if (!foundPokemon) {
        throw { name: 'notFound', message: 'Pokemon not found' }
      }
      const pokemonDetail = await axios({
        method: 'get',
        url: foundPokemon.url,
      })
      res.status(200).json(pokemonDetail.data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PokemonController
