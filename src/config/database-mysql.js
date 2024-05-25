const fs = require('fs');
const path = require('path');
const { createPool } = require('mysql2/promise');


const areEnvVariablesSet = (() => {
  const variables = [
    process.env.DATABASE_HOST,
    process.env.DATABASE_PORT,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_DBNAME,
  ]
  return variables.every(variable => variable);
})()

if (!areEnvVariablesSet) {
  throw new Error('Not all env variables are set');
}

const certPath = path.join(__dirname, '../../database/certs/ca.pem')
const connectionOptions = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
};
const pool = createPool(connectionOptions);

module.exports = { pool };

/**
 * Que es POOL?
 * 
 * Pool es una clase que nos permite conectarnos a una base de datos de PostgreSQL.
 * El concepto de Pool significa que se crean varias conexiones a la base de datos y se
 * reutilizan en lugar de crear una nueva conexión cada vez que se necesita una. Esto
 * mejora el rendimiento de la aplicación al evitar la sobrecarga de crear y cerrar
 * conexiones a la base de datos.
 * 
 * Caso de uso:
 * 
 * En una aplicación web, cada vez que un usuario realiza una solicitud al servidor, se
 * necesita una conexión a la base de datos para recuperar o almacenar datos. Si se
 * creara una nueva conexión a la base de datos cada vez que un usuario realiza una
 * solicitud, la aplicación se volvería lenta y podría no escalar bien.
 * 
 * En cambio, si se utiliza un Pool, se pueden reutilizar las conexiones a la base de
 * datos y se pueden manejar múltiples solicitudes de manera eficiente. Esto mejora el
 * rendimiento de la aplicación y permite que maneje un mayor número de usuarios
 * simultáneamente.
 */