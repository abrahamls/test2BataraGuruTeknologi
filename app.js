require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    console.log('tes')
  } catch (error) {
    console.log(error)
  }
})

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB')
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
