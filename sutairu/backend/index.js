import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import inscriptionRoutes from "./routes/inscriptionRoutes.js";
import connexionRoutes from "./routes/connexionRoutes.js";
import sauvegardeRoutes from "./routes/sauvegardeRoutes.js"; 
import panierRoutes from "./routes/panierRoutes.js"; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const uri = process.env.MONGODB_URI;

app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("connected to Mongodb");

        app.use("/inscription", inscriptionRoutes); 
        app.use("/connexion", connexionRoutes); 
        app.use("/article", sauvegardeRoutes); 
        app.use("/panier", panierRoutes); 

        app.listen(5001, () => {
            console.log("Server is running on port 5001");
        });
    } catch (error) {
        console.error('Erreur connecting to MongoDB :', error);
    }
}

connectToDatabase();
