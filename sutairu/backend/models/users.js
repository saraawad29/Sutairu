import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const UserSchema = new Schema({
  login: String,
  nom: String,
  prenom: String,
  email: String,
  password: String,
  dateOfBirth: { type: Date, default: Date.now },
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre("save", async function (next) {
  const user = this;

  // Seulement hacher le mot de passe si c'est nouveau ou modifié
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Générer un sel pour le hachage
    const salt = await bcrypt.genSalt(10);

    // Hacher le mot de passe avec le sel généré
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Users = mongoose.model("users", UserSchema);

export default Users;
