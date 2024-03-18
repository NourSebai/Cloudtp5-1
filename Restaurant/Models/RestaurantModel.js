const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  chef_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chef', 
    required: true
  },
  recette_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recette', 
    required: true
  },
  nom: {
    type: String,
    required: true
  }
});

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = RestaurantModel;
