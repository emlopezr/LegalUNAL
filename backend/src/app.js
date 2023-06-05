import express from "express";
import cors from "cors";
import routesCuerposColegiados from "./routes/cuerpos_colegiados.routes.js";
import routesUsuarios from "./routes/usuarios.routes.js";
import routesDocumentos from "./routes/documentos.routes.js";

// Configuraciones
const app = express();
app.set("json spaces", 4); // Espacios de indentación que tendrán los JSON

// Middlewares
app.use(express.json()); // Usar datos en formato JSON

// Configuración de CORS
app.use(cors());

// Routes -> Cada uno de los grupos de rutas en un archivo independiente
app.use("/api/cuerpos_colegiados", routesCuerposColegiados);
app.use("/api/usuarios", routesUsuarios);
app.use("/api/documentos", routesDocumentos);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
