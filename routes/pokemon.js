const express = require('express')
const router = express()

router.get('/', async (req, res) => {
  try {
    console.log('this is pokemon route');
  } catch (error) {
    console.log(error);
  }
})

module.exports = router