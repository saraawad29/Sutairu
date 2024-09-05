import User from "../models/users.js";
import bcrypt from "bcryptjs";



const connexionController = {
  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      // Recherche de l'utilisateur dans la base de données par son email
      const user = await User.findOne({ email });

      // Vérifie si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Vérifie si le mot de passe est correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Authentification réussie
      return res.status(200).json({ message: "Connexion réussie", user });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  },
};

export default (connexionController);