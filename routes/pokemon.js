const express = require('express')
const router = express()
const PokemonController = require('../controllers/pokemonController')

router.get('/', PokemonController.getPokemons)
router.get('/:pokemonName', PokemonController.getPokemonDetail)

module.exports = router
