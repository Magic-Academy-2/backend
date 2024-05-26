const { pool } = require('../../config/database-mysql');


exports.getAll = async () => {
  const query = `SELECT * FROM users`;
  const { rows } = await pool.query(query);
  return rows;

  // Con mysql
  // const query = `SELECT * FROM users`;
  // const [rows] = await pool.query(query);
  // return rows;
}

exports.save = async ({ name, email, password, userRolesId }) => {
  const query = `INSERT INTO users (name, email, password, user_roles_id) VALUES (?, ?, ?, ?)`;
  const values = [name, email, password, userRolesId];
  try {
    // Ejecuta la consulta usando el pool
    const [resp] = await pool.query(query, values);
    console.log('id del nuevo usuario:', resp.insertId);
    return {
      id: resp.insertId,
      name,
      email,
      userRolesId
    };
  } catch (err) {
    // Maneja el error adecuadamente
    console.error('Error ejecutando la consulta:', err);
    throw err;
  }
};

exports.update = async (id, data) => {
  const query = `UPDATE users
                 SET username = $1, email = $2, password = $3
                 WHERE id = $4
                 RETURNING id, username, email`;
  const values = [data.username, data.email, data.password, id];
  const { rows } = await pool.query(query, values);
  return rows[0];

  // Con mysql
  // const query = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
  // const values = [data.username, data.email, data.password, id];
  // const [resp] = await pool.query(query, values);
  // return {
  //   id,
  //   username: data.username,
  //   email: data.email
  // };
}

exports.delete = async (id) => {
  const query = `DELETE FROM users WHERE id = $1`;
  await pool.query(query, [id]);

  // Con mysql
  // const query = `DELETE FROM users WHERE id = ?`;
  // await pool.query(query, [id]);
};

exports.findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await pool.query(query, [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  // TODO: handle case
  return rows[0];
};