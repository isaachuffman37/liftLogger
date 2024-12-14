const express = require('express')
const app = express()
const { ensureAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/welcome', ensureAuth, (req, res) => {
  const firstName = req.user?.firstName;
  res.render('welcomePage', {firstName})
})

module.exports = router