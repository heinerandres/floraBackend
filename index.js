import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import { dbConnection } from './database/config.js';

import productoRoutes from './routes/productosRoute.js';
import categoriasRoute from './routes/categoriasRoute.js';
import aromasRoute from './routes/aromasRoute.js';
import beneficiosRoute from './routes/beneficiosRoute.js';
import ingredientesRoute from './routes/ingredientesRoute.js';
import tiposPielRoute from './routes/tiposPielRoute.js';
import variantesRoute from './routes/variantesRoute.js';
import path from "path";

dotenv.config();

const app = express();

const startServer = async () => {
  try{
    await dbConnection();

    app.use(cors());
    app.use(express.json());


    //app.use(express.static('public'));

    app.use("/public", express.static(path.join(process.cwd(), "public")));

    app.get("/", (req, res) => {
      console.log("/");
      res.send("API funcionando 🚀");
    });

    app.use('/api/productos', productoRoutes);
    app.use('/api/categorias', categoriasRoute);
    app.use('/api/aromas', aromasRoute);
    app.use('/api/beneficios', beneficiosRoute);
    app.use('/api/ingredientes', ingredientesRoute);
    app.use('/api/tiposPiel', tiposPielRoute);
    app.use('/api/variantes', variantesRoute);

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  }
  catch(error){
      console.log( error );
      throw new Error ( 'Error a la hora de inicializar la BD' );
  }
}

startServer();