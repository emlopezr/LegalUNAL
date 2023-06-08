import mysql from "../config/database.js";

export const getDocumentos = async (req, res) => {
    try {
        const [rows] = await mysql.query("SELECT * FROM documento");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
            message: error
        });
    }
};

export const getDocumento = async (req, res) => {
    const { id } = req.params;
    
    // Conseguir el total de documentos
    if (id === 'totalDocumentos') {
        try {
            const [rows] = await mysql.query("SELECT COUNT(*) FROM documento");
            return res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({
                error: "Ocurrió un error en el servidor",
                message: error
            });
        }
    }

    // Conseguir una página de documentos
    if (parseInt(id) < 50) {
        try {
            const [rows] = await mysql.query(
                `SELECT * FROM documento
                ORDER BY id
                LIMIT 5
                OFFSET ?
                `
            , [(id - 1) * 5]
            );
            return res.json(rows);
        } catch (error) {
            return res.status(500).json({
                error: "Ocurrió un error en el servidor",
                message: error
            });
        }
    }
    
    // Conseguir un documento único a partir de su ID
    try {
        const [rows] = await mysql.query(
            "SELECT * FROM documento WHERE id = ?",
            [id]
        );

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "No se ha encontrado un documento con este ID",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
            message: error
        });
    }
};

export const createDocumento = async (req, res) => {
    // Para crear un documento se requiere un objeto así
    // { id_cuerpo_colegiado, id_usuario, tipo, numero, anio, informacion }
    const { id_cuerpo_colegiado, id_usuario, tipo, numero, anio, informacion } =
        req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (
        !id_cuerpo_colegiado ||
        !id_usuario ||
        !tipo ||
        !numero ||
        !anio ||
        !informacion
    ) {
        res.status(500).json({
            error: "Petición incorrecta",
        });
        return;
    }

    try {
        // Guardar el usuario en la BD y mandar el objeto creado para confirmar
        const [rows] = await mysql.query(
            "INSERT INTO documento (id_cuerpo_colegiado, id_usuario, tipo, numero, anio, informacion) VALUES (?, ?, ?, ?, ?, ?)",
            [id_cuerpo_colegiado, id_usuario, tipo, numero, anio, informacion]
        );
        res.json({
            id: rows.insertId,
            id_cuerpo_colegiado,
            id_usuario,
            tipo,
            numero,
            anio,
            informacion,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
            message: error
        });
    }
};

export const deleteDocumento = async (req, res) => {
    // Conseguir el ID del documento a eliminar
    const { id } = req.params;

    try {
        // Eliminar de la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            "DELETE FROM documento WHERE id = ?",
            [id]
        );

        if (result.affectedRows > 0) {
            res.json({
                message: "Se ha eliminado este documento con éxito",
            });
        } else {
            res.status(404).json({
                error: "No se ha encontrado un documento con este ID",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
            message: error
        });
    }
};

export const updateDocumento = async (req, res) => {
    // Conseguir el ID del cuerpo colegido a editar
    const { id } = req.params;

    // Estamos usando el verbo PATCH por lo que
    // no es necesario pasar todos los campos
    const { id_cuerpo_colegiado, id_usuario, tipo, numero, anio, informacion } =
        req.body;

    try {
        // Guardar las películas en la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            `UPDATE documento SET
            id_cuerpo_colegiado = IFNULL(?, id_cuerpo_colegiado),
            id_usuario = IFNULL(?, id_usuario),
            tipo = IFNULL(?, tipo),
            numero = IFNULL(?, numero),
            anio = IFNULL(?, anio),
            informacion = IFNULL(?, informacion)
            WHERE id = ?`,
            [
                id_cuerpo_colegiado,
                id_usuario,
                tipo,
                numero,
                anio,
                informacion,
                id,
            ]
        );

        if (result.affectedRows > 0) {
            const [rows] = await mysql.query(
                "SELECT * FROM documento WHERE id = ?",
                [id]
            );
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "No se ha encontrado un documento con este ID",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
            message: error
        });
    }
};