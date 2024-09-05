import React, { useState } from "react";
import axios from 'axios';
import connexion from "../images/connexion.jpg";
import "./inscription.css";

function Inscription2() {
  const [values, setValues] = useState({
    nom: '', 
    prenom:'', 
    email: '',
    password:'', 
    dateOfBirth:''
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/inscription', values, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('User created:', response.data);
      alert("Data saved successfully");
      setValues({
        nom: '', 
        prenom:'', 
        email: '',
        password:'', 
        dateOfBirth:''
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="container">
        <div className="image-section">
          <img src={connexion} alt="image connexion" />
        </div>
        <div className="inscription-section">
          <h2>INSCRIPTION</h2>
          <div className="input-group">
            <label htmlFor="nom">Nom:</label>
            <input type="text" id="nom" value={values.nom} onChange={e => setValues({...values, nom: e.target.value})} />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prénom :</label>
            <input type="text" id="prenom" value={values.prenom} onChange={e => setValues({...values, prenom: e.target.value})} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" value={values.password} onChange={e => setValues({...values, password: e.target.value})} />
          </div>
          <div className="input-group">
            <label htmlFor="dateOfBirth">Date de naissance :</label>
            <input type="date" id="dateOfBirth" value={values.dateOfBirth} onChange={e => setValues({...values, dateOfBirth: e.target.value})} />
          </div>
          <button type="submit">CRÉER MON COMPTE</button>
        </div>
      </div>
    </form>
  );
}

export default Inscription2;
