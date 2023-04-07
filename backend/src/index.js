// TODO: Hacer los controladores/endpoints para las entidades intersección
// TODO: Poner los CHECKS en las tablas y reiniciar el entorno de MySQL

import express from "express";
import routesCuerposColegiados from './routes/cuerpos_colegiados.routes.js'
import routesUsuarios from './routes/usuarios.routes.js'
import routesDocumentos from './routes/documentos.routes.js'

const app = express();

// Configuraciones
app.set("port", process.env.port || 3000); // Conseguir el puerto de las variables de entorno, usar 3000 por default
app.set("json spaces", 4); // Espacios de indentación que tendrán los JSON

// Middlewares
app.use(express.json()); // Usar datos en formato JSON

// Routes -> Cada uno de los grupos de rutas en un archivo independiente
app.use("/api/cuerpos_colegiados", routesCuerposColegiados);
app.use("/api/usuarios", routesUsuarios);
app.use("/api/documentos", routesDocumentos);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    })
})

// Inicializar el servidor
app.listen(app.get("port"), () =>
    console.log(`Server funcionando en el puerto ${app.get("port")}`)
);
