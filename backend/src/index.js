// TODO: Hacer los endpoints para las entidades intersección
// TODO: Maybe implementar una BD en MySQL

import express, { request } from "express";
import routesCuerposColegiados from './routes/cuerpos_colegiados.routes.js'
// import routesUsuarios from './routes/usuarios.routes.js'
// import routesDocumentos from './routes/documentos.routes.js'

const app = express();

// Configuraciones
app.set("port", process.env.port || 3000); // Conseguir el puerto de las variables de entorno, usar 3000 por default
app.set("json spaces", 4); // Espacios de indentación que tendrán los JSON

// Middlewares
app.use(express.urlencoded({ extended: false })); // Solo usar datos sencillos de los formularios
app.use(express.json()); // Usar datos en formato JSON

// Routes -> Cada uno de los grupos de rutas en un archivo independiente
app.use("/api/cuerpos_colegiados", routesCuerposColegiados);
// app.use("/api/usuarios", routesUsuarios);
// app.use("/api/documentos", routesDocumentos);

// Inicializar el servidor
app.listen(app.get("port"), () =>
    console.log(`Server funcionando en el puerto ${app.get("port")}`)
);
