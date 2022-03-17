const express = require('express')
const router = express()
const PokemonController = require('../controllers/pokemonController')

router.get('/', PokemonController.getPokemons)

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log((error));
  }
})

module.exports = router
