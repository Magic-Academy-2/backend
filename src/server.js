require('dotenv').config();
const { pool } = require('./config/database-mysql');
const app = require('./app');

const port = process.env.PORT || 4000;

// Prueba la conexión a la base de datos
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     process.exit(1);
//   } else {
//     console.log('Connected to the PostgreSQL database.:', res.rows);
//     app.listen(port, () => {
//       console.log(`Servidor ejecutándose en http://localhost:${port}`);
//     });
//   }
// });
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});