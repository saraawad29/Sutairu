import React from "react";
import { Routes, Route } from "react-router-dom";
//BrowserRouter as Router,
import HomePage from "./pages/Home";
import Header from "./Header";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connection";
import CreateDesign from "./pages/CreateDesign";
import Designs from "./pages/MesDesign";
import Profile from "./pages/MyProfile";
import Colis from "./pages/MonColis";
import Panier from "./pages/MonPanier";
import Commandes from "./pages/MesCommandes";
import Propos from "./pages/Propos";
import { PanierProvider } from "./pages/PanierProvider";
import ForgetMdpPage from "./pages/foregtmdp";

function App() {
  return (
    <div>
      <Header>
      <PanierProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/changement-mot-de-passe" element={<ForgetMdpPage />} />
          <Route path="/creerdesign" element={<CreateDesign />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/colis" element={<Colis />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/commandes" element={<Commandes />} />
          <Route path="/propos" element={<Propos />} />
        </Routes>
        </PanierProvider>
      </Header>
    </div>
  );
}

export default App;


// import { useState } from 'react'

// function App() {

//   const [name, setName] = useState("");

//   const [email, setEmail] = useState("");

//   const handleOnSubmit = async (e) => {

//     e.preventDefault();

//     let result = await fetch(

//       'http://localhost:5001/register', {

//       method: "post",

//       body: JSON.stringify({ name, email }),

//       headers: {

//         'Content-Type': 'application/json'

//       }

//     })

//     result = await result.json();

//     console.warn(result);

//     if (result) {

//       alert("Data saved succesfully");

//       setEmail("");

//       setName("");

//     }

//   }

//   return (

//     <>

//       <h1>This is React WebApp </h1>

//       <form action="">

//         <input type="text" placeholder="name"

//           value={name} onChange={(e) => setName(e.target.value)} />

//         <input type="email" placeholder="email"

//           value={email} onChange={(e) => setEmail(e.target.value)} />

//         <button type="submit"

//           onClick={handleOnSubmit}>submit</button>

//       </form>


//     </>

//   );
// }


// export default App;