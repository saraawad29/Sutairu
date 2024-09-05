import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { countries } from "countries-list";
import './mesCommandes.css'
import ThreeArticle from '../components/ThreeArticle';

function MesCommandes() {
  const [panier, setPanier] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const response = await axios.get('http://localhost:5001/panier/lulu@test.com');
        setPanier(response.data.articles);
      } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error);
      }
    };

    fetchPanier();
  }, []);

  const calculerPrixTotal = () => {
    let total = 0;
    panier.forEach((item) => {
      if (item.article) {
        total += item.article.prix * item.quantite;
      }
    });
    return total;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const suivreMonColis = () => {
    navigate("/colis");
  };

  const countryOptions = Object.keys(countries).map((code) => ({
    code,
    name: countries[code].name,
  }));

  return (
    <div className="main-container-commandes">
      <div className="card-container-commandes">
        <div className="card-commandes">
          {panier.map((item) => (
            <div key={item.article._id} className="CardItem-commandes">
              <div className="leftSide-commandes">
                {item.article && (
                  <>
                    <ThreeArticle type={item.article.hoodie} color={item.article.couleur} />
                    <p className="productName-commandes">{item.article.hoodie}</p>
                  </>
                )}
              </div>
              <div className="rightSide-commandes">
                <div className='detail-commandes'>
                  {item.article && (
                    <>
                      <p>Taille : {item.article.taille}</p>
                      <p>Quantité : {item.quantite}</p>
                      <p>Prix : {item.article.prix}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
        <div className="button-container">
            <button className="prixBtn-commandes">
              Prix total : ${calculerPrixTotal()}
            </button>
          </div>
      </div>
      
      <div className="payment-container">
        <div className="payment-form">
          <h1>Le payement</h1>
          <div className="payment-options">
            <button className="option selected">Cartes</button>
            <button className="option">Apple Pay</button>
            <button className="option">PayPal</button>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="card-number" className="card-text">Numéro de Carte :</label>
              <input type="text" id="card-number" className="placeholder" placeholder="Votre nom" />
            </div>
            <div className="form-group">
              <label htmlFor="expiration" className="card-text">Expiration :</label>
              <input type="text" id="expiration" className="placeholder" placeholder="Votre expiration" />
            </div>
            <div className="form-group">
              <label htmlFor="cvc" className="card-text">CVC :</label>
              <input type="text" id="cvc" className="placeholder" placeholder="Votre CVC" />
            </div>
            <div className="form-group">
              <label htmlFor="country" className="card-text">Pays :</label>
              <select id="country" className="country">
                <option value="">Sélectionnez un pays</option>
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="butt-paye" onClick={showModal}>
              Payer
            </button>
            {isModalVisible && (
              <div>
                <div className="modal-overlay"></div>
                <div className="modal-content">
                  <h2>Votre paiement a bien été accepté</h2>
                  <div className="modal-buttons">
                    <button onClick={suivreMonColis} className="modal-btn">
                      Suivre mon colis
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default MesCommandes;
