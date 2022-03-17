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
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(limiter)

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