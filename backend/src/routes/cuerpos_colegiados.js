const { Router, request } = require("express");
const router = Router();

// Conseguir el archivo JSON de datos provisionales
const JSON_FILE = "../database.json";
const database = require(JSON_FILE);

// Para leer más fácilmente los datos que necesitamos
const { cuerpos_colegiados } = database;

// Rutas
router.get("/", (req, res) => {
    res.json(cuerpos_colegiados);
});

router.post("/", (req, res) => {
    // Para crear un cuerpo colegiado se requiere un objeto así
    // { "nombre": "NOMBRE_CUERPO_COLEGIADO" }, el ID es auto-generado
    const { nombre } = req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (!nombre) {
        res.status(500).send({ error: "Petición incorrecta" });
        return;
    }

    // Conseguir el último ID de la base de datos y sumarle 1
    const lastID = Object.keys(cuerpos_colegiados).slice(-1)[0];
    const id = String(parseInt(lastID) + 1);

    // Guardar las películas en la BD y mandar mensaje de éxito
    database.cuerpos_colegiados[id] = req.body;
    res.json({ message: `${nombre} (ID: ${id}) creado correctamente` });
});

router.delete("/:id", (req, res) => {
    // Conseguir el ID del cuerpo colegido a eliminar
    const { id } = req.params;
    
    // Verificar que exista ese ID en la 
    if (!database.cuerpos_colegiados[id]) {
        res.status(500).send({ error: "Petición incorrecta" });
        return;
    }

    // Eliminar de la BD y mandar mensaje de éxito
    delete database.cuerpos_colegiados[id];
    res.json({ message: `Cuerpo colegiado ${id} eliminado correctamente` });
});

router.put("/:id", (req, res) => {
    // Conseguir el ID del cuerpo colegido a editar
    const { id } = req.params;

    // Para editar un cuerpo colegiado se requiere un objeto así
    // { "nombre": "NUEVO_NOMBRE_CUERPO_COLEGIADO" }
    const { nombre } = req.body;

    // Verificar que exista ese ID en la BD
    // Verificar que se hayan pasado los datos correctamente
    if (!nombre || !database.cuerpos_colegiados[id]) {
        res.status(500).send({ error: "Petición incorrecta" });
        return;
    }

    // Guardar las películas en la BD y mandar mensaje de éxito
    database.cuerpos_colegiados[id] = req.body;
    res.json({ message: `${nombre} (ID: ${id}) editado correctamente` });
});

module.exports = router;
