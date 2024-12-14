const express = require('express')
const app = express()
const { ensureAuth } = require('../middleware/auth')

app.use(express.json());
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUpdateUser,
} = require("../controllers/usersController.js")

const router = express.Router()

router.get('/', ensureAuth, getUsers)

router.get('/updateUser', ensureAuth, getUpdateUser)

router.get('/userInfo', ensureAuth, getUser)

router.post('/', ensureAuth, createUser)

router.post('/updateUser', ensureAuth, updateUser)

router.delete('/:id', ensureAuth, deleteUser)

router.put('/:id', ensureAuth, updateUser)

module.exports = router