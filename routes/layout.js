const express = require('express')
const { ensureGuest } = require('../middleware/auth')
const app = express()

const router = express.Router()

router.get('/', ensureGuest, (req, res) => {
  res.render('login')
})

module.exports = router