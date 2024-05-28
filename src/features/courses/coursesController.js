const { findById } = require("../users/userModel");
const { getAll, save, update, remove, GET_ALL_COURSES_MODEL_ERRORS } = require("./coursesModel");


exports.getAll = async (req, res) => {
    try {
        const user = await findById(req.user.id);
        const courses = await getAll({ userId: user.id, userRole: user.user_roles_id });
        res.json({ message: "courses fetched successfully", courses });
    } catch (err) {
        switch (err.message) {
            case GET_ALL_COURSES_MODEL_ERRORS.INVALID_USER:
                return res.status(400).json({ message: GET_ALL_COURSES_MODEL_ERRORS.INVALID_USER_ROLE });
            case GET_ALL_COURSES_MODEL_ERRORS.ADMIN_NOT_IMPLEMENTED:
                return res.status(400).json({ message: GET_ALL_COURSES_MODEL_ERRORS.ADMIN_NOT_IMPLEMENTED });
            default:
                console.error('Error en getAll:', err);
                res.status(500).json({ message: 'Error en el servidor' });
        }

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