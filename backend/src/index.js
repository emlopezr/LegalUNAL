// TODO: Cambiar la sintaxis de require y module.exports por la moderna de imports

// Morgan es una dependencia que permite ver por consola lo que llega al servidor
const morgan = require('morgan');

// Express es un framework para crear el servidor
const express = require('express');
const app = express();

// Configuraciones
app.set('port', process.env.port || 3000); // Conseguir el puerto de las variables de entorno, usar 3000 por default
app.set('json spaces', 4) // Espacios de indentación que tendrán los JSON

// Middlewares
app.use(morgan('dev')); // Mensaje en consola de cada petición al server "VERBO-RUTA-RESPUESTA-TIEMPO-BYTES"
app.use(express.urlencoded({extended: false})); // Solo usar datos sencillos de los formularios
app.use(express.json()); // Usar datos en formato JSON

// Routes -> Cada uno de los grupos de rutas en un archivo independiente
app.use('/api/cuerpos_colegiados', require('./routes/cuerpos_colegiados'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/documentos', require('./routes/documentos'));

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server funcionando en el puerto ${app.get('port')}`)
})