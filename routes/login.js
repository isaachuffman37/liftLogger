const express = require('express')
const app = express()

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router