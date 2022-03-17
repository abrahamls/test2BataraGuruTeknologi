require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const pokemonRouter = require('./routes/pokemon')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/pokemons', pokemonRouter)

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB')
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
