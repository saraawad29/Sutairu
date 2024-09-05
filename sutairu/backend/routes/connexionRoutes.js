import express from "express";
import Users from "../models/users.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Middleware pour parser les requêtes JSON
router.use(express.json());

// Route pour gérer la connexion des utilisateurs
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Chercher l'utilisateur par email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Connexion réussie
    res.status(200).json({ message: "Connexion réussie", user });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
  }
});

export default router;
