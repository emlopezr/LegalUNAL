import mysql from "../config/database.js";

export const getReferencias = async (req, res) => {
    // Conseguir las referencias de un documento a partir de su ID
    const { id } = req.params;

    try {
        const [rows] = await mysql.query(
            `SELECT d2.id, d2.tipo, d2.numero, d2.anio
            FROM documento AS d1
            INNER JOIN referencia AS r
            ON r.id_documento_referenciador = d1.id
            INNER JOIN documento AS d2
            ON r.id_documento_referenciado = d2.id
            WHERE d1.id = ?`,
            [id]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({
                error: "Este documento no tiene referencias o no existe",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const getReferidos = async (req, res) => {
    // Conseguir los referidos de un documento a partir de su ID
    const { id } = req.params;

    try {
        const [rows] = await mysql.query(
            `SELECT d2.id, d2.tipo, d2.numero, d2.anio
            FROM documento AS d1
            INNER JOIN referencia AS r
            ON r.id_documento_referenciado = d1.id
            INNER JOIN documento AS d2
            ON r.id_documento_referenciador = d2.id
            WHERE d1.id = ?`,
            [id]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({
                error: "Este documento no tiene referencias o no existe",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const createReferencia = async (req, res) => {
    // Para crear una referencia de un documento se requiere un objeto así
    // { id_documento_referenciador, id_documento_referenciado }
    const { id_documento_referenciador, id_documento_referenciado } = req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (!id_documento_referenciador || !id_documento_referenciado) {
        res.status(500).json({
            error: "Petición incorrecta",
        });
        return;
    }

    try {
        // Guardar el usuario en la BD y mandar el objeto creado para confirmar
        const [rows] = await mysql.query(
            "INSERT INTO referencia (id_documento_referenciador, id_documento_referenciado) VALUES (?, ?)",
            [id_documento_referenciador, id_documento_referenciado]
        );
        res.json({
            id_documento_referenciador,
            id_documento_referenciado,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const deleteReferencia = async (req, res) => {
    // Conseguir las IDs de la referencia a eliminar
    const { id1, id2 } = req.params;

    try {
        // Eliminar de la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            "DELETE FROM referencia WHERE id_documento_referenciador = ? AND id_documento_referenciado = ?",
            [id1, id2]
        );

        if (result.affectedRows > 0) {
            res.json({
                message: "Se ha eliminado esta referencia con éxito",
            });
        } else {
            res.status(404).json({
                error: "No se ha encontrado esta referencia",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const updateReferencia = async (req, res) => {
    // Conseguir el ID del cuerpo colegido a editar
    const { id1, id2 } = req.params;

    // Estamos usando el verbo PATCH por lo que
    // no es necesario pasar todos los campos
    const { id_documento_referenciador, id_documento_referenciado } = req.body;

    try {
        // Guardar las películas en la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            `UPDATE referencia SET
            id_documento_referenciador = IFNULL(?, id_documento_referenciador),
            id_documento_referenciado = IFNULL(?, id_documento_referenciado)
            WHERE id_documento_referenciador = ? AND id_documento_referenciado = ?`,
            [id_documento_referenciador, id_documento_referenciado, id1, id2]
        );

        if (result.affectedRows > 0) {
            const [rows] = await mysql.query(
                "SELECT * FROM referencia WHERE id_documento_referenciador = ? AND id_documento_referenciado = ?",
                [id1, id2]
            );
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "No se ha encontrado esta referencia",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};