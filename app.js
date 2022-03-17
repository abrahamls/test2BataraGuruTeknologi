require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const pokemonRouter = require('./routes/pokemon')
const userRouter = require('./routes/user')
const { authentication } = require('./middlewares/authentication')
const { errorHandler } = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/pokemons', authentication, pokemonRouter)
app.use('/users', userRouter)

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB')
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(errorHandler)