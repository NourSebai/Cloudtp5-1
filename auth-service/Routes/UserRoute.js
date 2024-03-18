const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel'); 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nom_complet, email, mdp } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(mdp, 10);

    const newUser = new UserModel({
      nom_complet,
      email,
      mdp: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l`inscription :', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, mdp } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    const token = jwt.sign({ userId: user._id }, 'votre_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion de lutilisateur :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion de l\'utilisateur.' });
  }
});

module.exports = router;
