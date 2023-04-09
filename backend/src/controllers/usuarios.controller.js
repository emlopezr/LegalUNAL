import mysql from "../config/database.js";

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await mysql.query("SELECT * FROM usuario");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const getUsuario = async (req, res) => {
    // Conseguir un usuario a partir de su ID
    const { id } = req.params;

    try {
        const [rows] = await mysql.query("SELECT * FROM usuario WHERE id = ?", [
            id,
        ]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "No se ha encontrado un usuario con este ID",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const createUsuario = async (req, res) => {
    // Para crear un usuario se requiere un objeto así
    // { nombres, apellidos, email, rol }
    const { nombres, apellidos, email, rol } = req.body;

    // Verificar que se hayan pasado los datos correctamente
    if (!nombres || !apellidos || !email || !rol) {
        res.status(500).json({
            error: "Petición incorrecta",
        });
        return;
    }

    try {
        // Guardar el usuario en la BD y mandar el objeto creado para confirmar
        const [rows] = await mysql.query(
            "INSERT INTO usuario (nombres, apellidos, email, rol) VALUES (?, ?, ?, ?)",
            [nombres, apellidos, email, rol]
        );
        res.json({
            id: rows.insertId,
            nombres,
            apellidos,
            email,
            rol,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const deleteUsuario = async (req, res) => {
    // Conseguir el ID del usuario a eliminar
    const { id } = req.params;

    try {
        // Eliminar de la BD y mandar mensaje de éxito
        const [result] = await mysql.query("DELETE FROM usuario WHERE id = ?", [
            id,
        ]);

        if (result.affectedRows > 0) {
            res.json({
                message: "Se ha eliminado este usuario con éxito",
            });
        } else {
            res.status(404).json({
                error: "No se ha encontrado un usuario con este ID",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};

export const updateUsuario = async (req, res) => {
    // Conseguir el ID del cuerpo colegido a editar
    const { id } = req.params;

    // Estamos usando el verbo PATCH por lo que
    // no es necesario pasar todos los campos
    const { nombres, apellidos, email, rol } = req.body;

    try {
        // Guardar las películas en la BD y mandar mensaje de éxito
        const [result] = await mysql.query(
            `UPDATE usuario SET
            nombres = IFNULL(?, nombres),
            apellidos = IFNULL(?, apellidos),
            email = IFNULL(?, email),
            rol = IFNULL(?, rol)
            WHERE id = ?`,
            [nombres, apellidos, email, rol, id]
        );

        if (result.affectedRows > 0) {
            const [rows] = await mysql.query(
                "SELECT * FROM usuario WHERE id = ?",
                [id]
            );
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "No se ha encontrado un usuario con este ID",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error en el servidor",
        });
    }
};