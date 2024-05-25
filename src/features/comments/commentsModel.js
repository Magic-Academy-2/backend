const { pool } = require("../../config/database-mysql");

exports.getAll = async (comment_type_name, id) => {
    try {
        const query = 'SELECT * FROM comments WHERE comment_type_name = ? AND id = ?';
        const [topics] = await pool.query(query, [comment_type_name, id]);
        return topics;
    } catch (err) {
        console.error('Error en getAll:', err);
    }
}

exports.save = async (title, content, date, comment_type_name, comment_types_id, comment_id = null, users_id) => {
    try {
        const query = 'INSERT INTO comments (title, content, date, comment_type_name, comment_types_id, comment_id, users_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, content, date, comment_type_name, comment_types_id, comment_id, users_id]);
        return result;
    } catch (err) {
        console.error('Error en save:', err);
    }
}