const express = require('express')
const app = express()

const router = express.Router()

router.get('/welcome', (req, res) => {
  const firstName = req.user?.firstName;
  res.render('welcomePage', {firstName})
})

module.exports = router