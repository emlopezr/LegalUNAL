import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } from "./config/config.js";

// Configuración de la BD
export default createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME,
});
