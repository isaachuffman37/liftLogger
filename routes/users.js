const express = require('express')
const app = express()

app.use(express.json());
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require("../controllers/usersController.js")

const router = express.Router()

router.get('/', getUsers)

router.get('/userInfo', getUser)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

module.exports = router