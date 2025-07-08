import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.getConnection()
    .then((connection) => {
        console.log("Conexión exitosa a la base de datos");
        connection.release(); // Liberar la conexión al pool
    })
    .catch((err) => {
        console.error("Error al conectarse a la base de datos:");
    });

export default db