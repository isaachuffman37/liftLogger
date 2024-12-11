const express = require('express')
const app = express()

const router = express.Router()

router.get('/', (req, res) => {
  if (req.user) {
    const firstName = req.user?.firstName;
    res.render('welcomePage', {firstName})
  } else {
    res.redirect("/auth/google")
  }
})

module.exports = router