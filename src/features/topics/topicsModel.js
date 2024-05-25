const { pool } = require("../../config/database-mysql");

exports.getAll = async ()=> {
    try {
        const query = 'SELECT * FROM topics';
        const [topics] = await pool.query(query);
        return topics;
    } catch (err) {
        console.error('Error en getAll:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (name)=> {
    try {
        const query = 'INSERT INTO topics (name) VALUES (?)';
        const [resp] = await pool.query(query, [name]);
        return resp;
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}