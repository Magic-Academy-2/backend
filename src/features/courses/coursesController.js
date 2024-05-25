const { getAll, save, update, remove } = require("./coursesModel");


exports.getAll = async (req, res) => {
    try {
        const courses = await getAll();
        res.json({ message: "courses fetched successfully", courses });
    } catch (err) {
        console.error('Error en getAll:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (req, res) => {
    try {
        const { name, description, thumbnail_url, users_id, topics_id } = req.body;
        await save(name, description, thumbnail_url, users_id, topics_id);
        res.json({ message: "course saved successfully" });
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.update = async (req, res) => {
    try {
        const { name, description, thumbnail_url, users_id, topics_id } = req.body;
        const { id } = req.params;
        await update(name, description, thumbnail_url, users_id, topics_id, id);
        res.json({ message: "course updated successfully" });
    } catch (err) {
        console.error('Error en update:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await remove(id);
        res.json({ message: "course deleted successfully" });
    } catch (err) {
        console.error('Error en delete:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}