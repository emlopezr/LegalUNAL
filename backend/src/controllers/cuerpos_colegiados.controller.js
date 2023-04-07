import mysql from "../database.js";

const getCuerposColegiados = async (req, res) => {
    const [rows] = await mysql.query("SELECT * FROM cuerpo_colegiado");
    res.json(rows);
};

const getCuerpoColegiado = async (req, res) => {
    // Conseguir un cuerpo colegiado a partir de su ID
    const { id } = req.params;

    const [rows] = await mysql.query(
        "SELECT * FROM cuerpo_colegiado WHERE id = ?",
        [id]
    );

    if (rows.length > 0) {
        res.json(rows[0]);
    } else {
        res.status(404).json({
            error: "No se ha encontrado un cuerpo colegiado con este ID",
        });
    }
};

const createCuerpoColegiado = async (req, res) => {
    // Para crear un cuerpo colegiado se requiere un objeto así
    // { "nombre": "NOMBRE_CUERPO_COLEGIADO" }, el ID es auto-generado
    const { nombre } = req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (!nombre && nombre.length < 100) {
        res.status(500).json({
            error: "Petición incorrecta",
        });
        return;
    }

    // Guardar las cuerpo colegiado en la BD y mandar el objeto creado para confirmar
    const [rows] = await mysql.query(
        "INSERT INTO cuerpo_colegiado (nombre) VALUES (?)",
        [nombre]
    );
    res.json({
        id: rows.insertId,
        nombre,
    });
};

const deleteCuerpoColegiado = async (req, res) => {
    // Conseguir el ID del cuerpo colegido a eliminar
    const { id } = req.params;

    // Eliminar de la BD y mandar mensaje de éxito
    const [result] = await mysql.query(
        "DELETE FROM cuerpo_colegiado WHERE id = ?",
        [id]
    );

    if (result.affectedRows > 0) {
        res.json({
            message: "Se ha eliminado este cuerpo colegiado con éxito",
        });
    } else {
        res.status(404).json({
            error: "No se ha encontrado un cuerpo colegiado con este ID",
        });
    }
};

const updateCuerpoColegiado = async (req, res) => {
    // Conseguir el ID del cuerpo colegido a editar
    const { id } = req.params;

    // Para editar un cuerpo colegiado se requiere un objeto así
    // { "nombre": "NUEVO_NOMBRE_CUERPO_COLEGIADO" }
    const { nombre } = req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (!nombre && nombre.length < 100) {
        res.status(500).json({
            error: "Petición incorrecta",
        });
        return;
    }

    // Guardar las películas en la BD y mandar mensaje de éxito
    const [result] = await mysql.query(
        "UPDATE cuerpo_colegiado SET nombre = ? WHERE id = ?",
        [nombre, id]
    );

    if (result.affectedRows > 0) {
        const [rows] = await mysql.query(
            "SELECT * FROM cuerpo_colegiado WHERE id = ?",
            [id]
        );
        res.json(rows[0]);
    } else {
        res.status(404).json({
            error: "No se ha encontrado un cuerpo colegiado con este ID",
        });
    }
};

export {
    getCuerposColegiados,
    getCuerpoColegiado,
    createCuerpoColegiado,
    updateCuerpoColegiado,
    deleteCuerpoColegiado,
};
