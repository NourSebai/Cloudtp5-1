const express = require('express');
const RestaurantModel = require('../Models/RestaurantModel');
const ChefModel = require('../Models/ChefModel');
const RecetteModel = require('../Models/ReccetModel');

const verifyToken = require('../../auth-service/AuthMiddleware');

const router = express.Router();

// Route pour récupérer la liste de tous les restaurants
router.get('/all', async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des restaurants.' });
  }
});

// Route pour récupérer toutes les informations sur les chefs d'un restaurant
router.get('/chefs/:restaurantname', async (req, res) => {
  try {
    const { restaurantname } = req.params;
    const restaurant = await RestaurantModel.findOne({ nom: restaurantname });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé.' });
    }
    const chefs = await ChefModel.find({ _id: { $in: restaurant.chefs } });
    res.status(200).json(chefs);
  } catch (error) {
    console.error('Erreur lors de la récupération des chefs du restaurant :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des chefs du restaurant.' });
  }
});

// Route pour récupérer toutes les informations sur les recettes d'un restaurant
router.get('/recettes/:restaurantname', async (req, res) => {
  try {
    const { restaurantname } = req.params;
    const restaurant = await RestaurantModel.findOne({ nom: restaurantname });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé.' });
    }
    const recettes = await RecetteModel.find({ _id: { $in: restaurant.recettes } });
    res.status(200).json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes du restaurant :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des recettes du restaurant.' });
  }
});

// Route pour ajouter un restaurant
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { nom, chefs, recettes } = req.body;
    const newRestaurant = new RestaurantModel({ nom, chefs, recettes });
    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant ajouté avec succès.' });
  } catch (error) {
    console.error('Erreur lors de lajout du restaurant :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de lajout du restaurant.' });
  }
});

// Route pour modifier les informations d'un restaurant en se basant sur son nom
router.put('/update/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { chefs, recettes } = req.body;
    await RestaurantModel.findOneAndUpdate({ nom: name }, { chefs, recettes });
    res.status(200).json({ message: 'Informations du restaurant mises à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations du restaurant :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour des informations du restaurant.' });
  }
});

// Route pour supprimer un restaurant
router.delete('/delete/:name', async (req, res) => {
  try {
    const { name } = req.params;
    await RestaurantModel.findOneAndDelete({ nom: name });
    res.status(200).json({ message: 'Restaurant supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du restaurant :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du restaurant.' });
  }
});

module.exports = router;
