import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './monpanier.css';
import deleteSvg from "../icons/deleteSvg.svg";
import ThreeArticle from '../components/ThreeArticle';

function MonPanier() {
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

  const handleDelete = async (articleId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/panier/lulu@test.com/${articleId}`);
      alert("Article supprimé avec succès");
      window.location.reload();
    } catch (error) {
      alert('Erreur lors de la suppression de l\'article');
    }
  };

  const commander = () => {
    navigate('/commandes');
  };

  // Calcul du prix total du panier
  const calculerPrixTotal = () => {
    let total = 0;
    panier.forEach((item) => {
      if (item.article) { // Vérifiez si item.article est défini
        total += item.article.prix * item.quantite;
      }
    });
    return total;
  };

  return (
    <div className="card">
      {panier.map((item) => (
        <div key={item.article._id} className="CardItem">
          <div className="leftSide">
            {/* Affichage de l'article */}
            {item.article && (
              <>
                <ThreeArticle type={item.article.hoodie} color={item.article.couleur} />
                <p className="productName">{item.article.hoodie}</p>
              </>
            )}
          </div>
          <div className="rightSide">
            <div className='detail'>
              {item.article && (
                <>
                  <p>Taille : {item.article.taille}</p>
                  <p>Quantité : {item.quantite}</p>
                </>
              )}
            </div>
            <div className="sizePrice2">
              {item.article && (
                <>
                  <p>Prix unitaire : ${item.article.prix}</p>
                  <p>Sous-total : ${item.article.prix * item.quantite}</p>
                </>
              )}
            </div>

            {/* Utilisation d'une icône de corbeille pour supprimer l'article */}
            <div className="deleteIcon">
              <button className="boutonIcon" onClick={() => handleDelete(item.article._id)}>
                <img src={deleteSvg} alt="delete icon" style={{ width: "25px", height: "auto" }} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="button-container">
        <button className="prixBtn">
          Prix total : ${calculerPrixTotal()}
        </button>
      </div>
      <div className="button-container">
        <button onClick={commander} className="commanderBtn">
          Commander
        </button>
      </div>
    </div>
  );
}

export default MonPanier;
