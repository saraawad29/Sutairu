import express from "express";
import bcrypt from "bcryptjs";
import Users from "../models/users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { login, nom, prenom, email, password, dateOfBirth } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Cet email est déjà utilisé." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);// le nombre 10 est le salt round (le nombre de fois ou il va etre re-hacher donc la 10 fois)

    // Création du nouvelle utilisateur 
    const newUser = new Users({
      login,
      nom,
      prenom,
      email,
      password: hashedPassword, // faire en sortent le mot de passe soit hacher 
      dateOfBirth,
    });

    // Sauvegarder l'utilisateur
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
});

export default router;
