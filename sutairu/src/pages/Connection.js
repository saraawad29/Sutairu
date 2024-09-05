// Connection.js
import React, { useState } from "react";
import axios from 'axios';
import connexion from "../images/connexion.jpg";
import { Link } from 'react-router-dom'; // Importez Link depuis React Router
import "./inscription.css";

function Connection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur avant la tentative de connexion
    try {
      const response = await axios.post("http://localhost:5001/connexion", {
        email,
        password,
      });
      console.log("Réponse du serveur :", response.data);
      // Rediriger l'utilisateur vers la page d'accueil après connexion réussie
      window.location.href = '/'; // Redirection avec window.location.href
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response ? error.response.data : error.message);
      // Mettre à jour l'état avec le message d'erreur
      setErrorMessage(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={connexion} alt="connexion" />
      </div>
      <div className="connection-section">
        <h2>CONNEXION</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">CONNEXION</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Afficher le message d'erreur */}
        <div className="text">
          Je n’ai pas de compte ?
          <strong>
            <Link to="/inscription">Inscription</Link>
          </strong>
        </div>
        <div className="text">
          <strong>Mot de passe oublié</strong>
        </div>
      </div>
    </div>
  );
}

export default Connection;
