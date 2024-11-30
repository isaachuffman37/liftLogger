const express = require('express')
const app = express()

app.use(express.json());
const {
  renderLogin,
  renderRegister,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require("../controllers/usersController.js")

const router = express.Router()

router.get('/login', renderLogin)

router.get('/register', renderRegister)

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)


module.exports = router