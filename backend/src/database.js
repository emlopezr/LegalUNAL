import { createPool } from 'mysql2/promise'

// Configuración de la BD
export default createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'legal_unal'
})