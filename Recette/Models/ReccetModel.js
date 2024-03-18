const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique:true,
  },
  libelle: {
    type: String,
    required: true
  },
  
});

const Recette = mongoose.model('Recette', recetteSchema);

module.exports = Recette;
