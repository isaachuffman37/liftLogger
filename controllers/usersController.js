const User = require('../models/userModel.js')
const mongoose = require('mongoose')

const getUsers = async (req, res) => {
  const users = await User.find({}).sort()

  res.status(200).json(users)
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
  res.render('user', {userData: user})
}

const getUpdateUser = async (req, res) => {
  const id = req.user.id

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such user"})
  }

  const user = await User.findById(id)

  res.render('updateUser', {userData: user, successMessage: null})

}

// create a new user
const createUser = async (req, res) => {
  console.log(req.body);
  const {username, password, firstName, lastName} = req.body
  try{
    const user = await User.create({username, password, firstName, lastName})
    res.status(200).json(user)
  }catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a user
const deleteUser = async (req, res) => {
const id = req.user.id

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
  const id = req.user.id
  const {displayName} = req.body

  if (!displayName) {
    return res.status(400).json({ error: "Display name is required" });
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Id invalid"})
  }


  const user = await User.findByIdAndUpdate(
    id, 
    { displayName }, 
    { new: true } 
  );

  if(!user) {
    return res.status(400).json({error: "No such user"})
  }

  res.render('updateUser', {
    userData: user, 
    successMessage: 'Your display name has been updated successfully!' 
  });

}

module.exports = {
   getUsers,
   getUser,
   createUser, 
   deleteUser,
   updateUser, 
   getUpdateUser}