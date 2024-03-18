const express = require('express');
const RecetteModel = require('../Models/ReccetModel');

const router = express.Router();

// Route pour récupérer la liste de toutes les recettes
router.get('/all', async (req, res) => {
  try {
    const recettes = await RecetteModel.find();
    res.status(200).json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des recettes.' });
  }
});

// Route pour ajouter une recette
router.post('/add', async (req, res) => {
  try {
    const { id, libelle } = req.body;
    const newRecette = new RecetteModel({ id, libelle });
    await newRecette.save();
    res.status(201).json({ message: 'Recette ajoutée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de lajout de la recette :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de lajout de la recette.' });
  }
});

// Route pour modifier les informations d'une recette
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { libelle } = req.body;
    await RecetteModel.findOneAndUpdate({ id }, { libelle });
    res.status(200).json({ message: 'Informations de la recette mises à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations de la recette :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour des informations de la recette.' });
  }
});

// Route pour supprimer une recette
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await RecetteModel.findOneAndDelete({ id });
    res.status(200).json({ message: 'Recette supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la recette :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la recette.' });
  }
});

module.exports = router;
