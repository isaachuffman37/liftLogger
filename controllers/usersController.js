const User = require('../models/userModel.js')
const mongoose = require('mongoose')

const getUsers = async (req, res) => {
  const users = await User.find({}).sort()

  res.status(200).json(users)
  // res.render('user', {users: userData})
}

const getUser = async (req, res) => {
  const id = req.user.id

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such user"})
  }

  const user = await User.findById(id)

  if(!user) {
    return res.status(404).json({error: "No such user"})
  }
  console.log("Hit")
  // res.status(200).json(user)
  res.render('user', {userData: user})
}

// create a new user
const createUser = async (req, res) => {
  console.log(req.body);
  const {username, password, firstName, lastName} = req.body
  // let stuff = req.body
  // console.log(stuff)
  // add to db
  try{
    const user = await User.create({username, password, firstName, lastName})
    res.status(200).json(user)
  }catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a user
const deleteUser = async (req, res) => {
const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "No such user"})
}

const user = await User.findOneAndDelete({_id: id})

if(!user) {
  return res.status(400).json({error: "No such user"})
}

res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "No such user"})
}

const user = await User.findOneAndUpdate({_id: id}, {
  ...req.body
})

if(!user) {
  return res.status(400).json({error: "No such user"})
}

res.status(204).json(user)
}

module.exports = {
   getUsers,
   getUser,
   createUser, 
   deleteUser,
   updateUser}