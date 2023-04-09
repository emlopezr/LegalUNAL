import mysql from "../config/database.js";

export const getMiembrosCuerpoColegiado = async (req, res) => {
    // Conseguir los miembros de un cuerpo colegiado a partir de su ID
    const { id } = req.params;

    try {
        const [rows] = await mysql.query(
            `SELECT u.id, u.nombres, u.apellidos, u.email, mcc.rol
            FROM cuerpo_colegiado AS cc
            INNER JOIN miembro_cuerpo_colegiado AS mcc
            ON cc.id = mcc.id_cuerpo_colegiado
            INNER JOIN usuario AS u
            ON mcc.id_usuario = u.id
            WHERE cc.id = ?`,
            [id]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({
                error: "Este cuerpo colegiado no tiene miembros o no existe",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const getCuerposColegiadosUsuario = async (req, res) => {
    // Conseguir los miembros de un cuerpo colegiado a partir de su ID
    const { id } = req.params;

    try {
        const [rows] = await mysql.query(
            `SELECT cc.id, cc.nombre, mcc.rol
            FROM usuario AS u
            INNER JOIN miembro_cuerpo_colegiado AS mcc
            ON u.id = mcc.id_usuario
            INNER JOIN cuerpo_colegiado AS cc
            ON mcc.id_cuerpo_colegiado = cc.id
            WHERE u.id = ?`,
            [id]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({
                error: "Este usuario no es miembro de algún cuerpo colegiado o no existe",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const createMiembroCuerpoColegiado = async (req, res) => {
    // Para crear un miembro de cuerpo colegiado se requiere
    // { id_cuerpo_colegiado, id_usuario, rol }
    const { id_cuerpo_colegiado, id_usuario, rol } = req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (!id_cuerpo_colegiado || !id_usuario || !rol) {
        res.status(500).json({
            error: "Petición incorrecta",
        });
        return;
    }

    try {
        // Guardar el usuario en la BD y mandar el objeto creado para confirmar
        const [rows] = await mysql.query(
            "INSERT INTO miembro_cuerpo_colegiado ( id_cuerpo_colegiado, id_usuario, rol) VALUES (?, ?, ?)",
            [id_cuerpo_colegiado, id_usuario, rol]
        );
        res.json({
            id_cuerpo_colegiado,
            id_usuario,
            rol,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const deleteMiembroCuerpoColegiado = async (req, res) => {
    // Conseguir las IDs a eliminar
    const { id1, id2 } = req.params;

    try {
        // Eliminar de la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            "DELETE FROM miembro_cuerpo_colegiado WHERE id_cuerpo_colegiado = ? AND id_usuario = ?",
            [id1, id2]
        );

        if (result.affectedRows > 0) {
            res.json({
                message: "Se ha eliminado este miembro de cuerpo colegiado con éxito",
            });
        } else {
            res.status(404).json({
                error: "No se ha encontrado este miembro de cuerpo colegiado",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const updateMiembroCuerpoColegiado = async (req, res) => {
    // Conseguir el ID del cuerpo colegido a editar
    const { id1, id2 } = req.params;

    // Estamos usando el verbo PATCH por lo que
    // no es necesario pasar todos los campos
    const { id_cuerpo_colegiado, id_usuario, rol } = req.body;

    try {
        // Guardar las películas en la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            `UPDATE miembro_cuerpo_colegiado SET 
            id_cuerpo_colegiado = IFNULL(?, id_cuerpo_colegiado),
            id_usuario = IFNULL(?, id_usuario)
            WHERE id_cuerpo_colegiado = ? AND id_usuario = ?`,
            [id_cuerpo_colegiado, id_usuario, id1, id2]
        );

        if (result.affectedRows > 0) {
            const [rows] = await mysql.query(
                "SELECT * FROM miembro_cuerpo_colegiado WHERE id_cuerpo_colegiado = ? AND id_usuario = ?",
                [id1, id2]
            );
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "No se ha encontrado este miembro de cuerpo colegiado",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};
