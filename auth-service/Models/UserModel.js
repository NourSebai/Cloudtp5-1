const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
 
  nom_complet: {
    type: String,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mdp: {
    type: String
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
