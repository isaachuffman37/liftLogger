const mongoose = require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
}, {timestamps: true});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  try{
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};



const User = mongoose.model('user', userSchema);

module.exports = User;