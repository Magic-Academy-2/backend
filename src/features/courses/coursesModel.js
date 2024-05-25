const { pool } = require("../../config/database-mysql");

exports.getAll = async () => {
    try {
        const query = 'SELECT * FROM courses';
        const [topics] = await pool.query(query);
        return topics;
    } catch (err) {
        console.error('Error en getAll:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (name, description, thumbnail_url, users_id, topics_id) => {
    try {
        const query = 'INSERT INTO courses (name, description, thumbnail_url, users_id, topics_id) VALUES (?, ?, ?, ?, ?)';
        const [resp] = await pool.query(query, [name, description, thumbnail_url, users_id, topics_id]);
        return resp;
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.update = async (name, description, thumbnail_url, users_id, topics_id, id) => {
    try {
        const query = 'UPDATE courses SET name = ?, description = ?, thumbnail_url = ?, users_id = ?, topics_id = ? WHERE id = ?';
        const [resp] = await pool.query(query, [name, description, thumbnail_url, users_id, topics_id, id]);
        return resp;
    } catch (err) {
        console.error('Error en update:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.remove = async (id) => {
    try {
        const query = 'DELETE FROM courses WHERE id = ?';
        const [resp] = await pool.query(query, [id]);
        return resp;
    } catch (err) {
        console.error('Error en delete:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}