const { pool } = require('../../config/database-mysql');

exports.getAll = async () => {
  const query = `SELECT * FROM users`;
  const { rows } = await pool.query(query);
  return rows;

  // Con mysql
  // const query = `SELECT * FROM users`;
  // const [rows] = await pool.query(query);
  // return rows;
};

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
      userRolesId,
    };
  } catch (err) {
    // Maneja el error adecuadamente
    console.error('Error ejecutando la consulta:', err);
    throw err;
  }
};


exports.getUserTopics = async (userId) => {
  const query = `SELECT topics_id FROM user_topics WHERE users_id = ?`;
  const [rows] = await pool.query(query, [userId]);
  return rows.map((row) => row.topics_id);
}

exports.saveUserTopics = async ({ userId, topicIds }) => {
  const values = topicIds.map((topicId) => [userId, topicId]);
  const escapedValues = pool.escape(values);
  const query = `
    INSERT INTO user_topics(users_id, topics_id)
    VALUES ${escapedValues}`;
  try {
    const [result] = await pool.query(query, values);
    return result.affectedRows;
  } catch (err) {
    console.error('Error guardando los temas de interes del usuario:', err);
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
};

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
  const query = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};
