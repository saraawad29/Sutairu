import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardItem from '../components/Carditem';
import './mesdesign.css';

function MesDesigns() {
  const [articles, setArticles] = useState([]);
  const [panier, setPanier] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/article')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles :', error);
      });
  }, []);

  const ajouterAuPanier = (article) => {
    setPanier([...panier, article]);
    console.log('Article ajouté au panier :', article);
  };

  const redirecttoPanier = () => {
    navigate('/panier', { state: { panier } });
  };

  return (
    <div className="card">
      {articles.map((item) => (
        <CardItem
          key={item._id}
          item={{
            id: item._id,
            hoodie: item.hoodie,
            taille: item.taille,
            prix: item.prix,
            couleur: item.couleur 
          }}
          ajouterAuPanier={ajouterAuPanier}
        />
      ))}
      <div className="button-container">
        <button onClick={redirecttoPanier} className="voir-le-panier">
          Voir le panier
        </button>
      </div>
    </div>
  );
}

export default MesDesigns;
