const { getAll } = require('./commentsModel');

exports.getAll = async (req, res) => {
    try {
        const { comment_type_name, id } = req.params;
        const comment = await getAll(comment_type_name, id);
        res.json({ message: "course comments", comment });
    } catch (err) {
        console.error('Error en getAll:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (req, res) => {
    try {
        const course = await save(req.body);
        res.json({ message: "course saved successfully", course });
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}