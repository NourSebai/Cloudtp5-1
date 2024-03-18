const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique:true,
  },
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  }
});

const ChefModel = mongoose.model('Chef', chefSchema);

module.exports = ChefModel;
