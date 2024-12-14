const express = require('express')
const app = express()
const { ensureAuth } = require('../middleware/auth')

app.use(express.json());
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require("../controllers/usersController.js")

const router = express.Router()

router.get('/', ensureAuth, getUsers)

router.get('/userInfo', ensureAuth, getUser)

router.post('/', ensureAuth, createUser)

router.delete('/:id', ensureAuth, deleteUser)

router.put('/:id', ensureAuth, updateUser)

module.exports = router