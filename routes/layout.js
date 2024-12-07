const express = require('express')
const app = express()

const router = express.Router()

router.get('/', (req, res) => {
  const firstName = req.user?.firstName || null;
  res.render('welcomePage', {firstName})
})

module.exports = router