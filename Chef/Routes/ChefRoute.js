const express = require('express');
const ChefModel = require('../Models/ChefModel');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const chefs = await ChefModel.find();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des chefs.' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const newChef = new ChefModel({ name, specialty });
    await newChef.save();
    res.status(201).json({ message: 'Chef ajouté avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l`ajout du chef :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l`ajout du chef.' });
  }
});

router.put('/update/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { specialty } = req.body;
    await ChefModel.findOneAndUpdate({ name }, { specialty });
    res.status(200).json({ message: 'Informations du chef mises à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations du chef :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour des informations du chef.' });
  }
});

router.delete('/delete/:name', async (req, res) => {
  try {
    const { name } = req.params;
    await ChefModel.findOneAndDelete({ name });
    res.status(200).json({ message: 'Chef supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du chef :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du chef.' });
  }
});

module.exports = router;