const { getAll, save } = require("./topicsModel");


exports.getAll = async (req, res) => {
    try {
        const topics = await getAll();
        res.json({ message: "Topics fetched successfully", topics });
    } catch (err) {
        console.error('Error en getAll:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (req, res) => {
    try {
        const { name } = req.body;
        await save(name);
        res.json({ message: "Topic saved successfully" });
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}