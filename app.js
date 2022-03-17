const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.get('/', async(req, res) => {
  try {
    console.log('tes');
  } catch (error) {
    console.log(error);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})