import dotenv from 'dotenv';

dotenv.config({});

/**
 * para no tener las credenciales de la base de datos,
 * las guardamos en un archivo aparte ".env" el cual es ignorado por git
 * y es cargado en las variables de entorno "process.env" solo en ejecución gracias al paquete "dotenv"
 */
export default {
  server: {
    port: process.env.PORT,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  },
};
