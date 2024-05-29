const userModel = require('./userModel');

const checkUserTopicsToSave = async ({ userId, topicIds }) => {
    if (!topicIds) return false;
    if (!Array.isArray(topicIds)) return false;
    if (!topicIds.length) return false;

    const currentUserTopics = await userModel.getUserTopics(userId);
    for (const topicId of topicIds) {
        if (currentUserTopics.includes(topicId)) return false;
    }

    return true;
}

const saveUserTopics = async (req, res) => {
    const { id, name: userName } = req.user
    const { id: userId } = req.params
    const { topicIds } = req.body;
    const numericUserId = parseInt(userId)
    // console.log({ topicIds, userName, numericUserId })

    if (numericUserId !== id)
        return res.status(400).json({ message: 'No puedes agregar temas de interés a otros usuarios' })

    if (!topicIds)
        return res.status(400).json({ message: `Estás intentando agregar temas ya añadidos para el usuario ${userName}` })

    const canSaveTopics = await checkUserTopicsToSave({ topicIds, userId })
    if (!canSaveTopics)
        return res.status(400).json({ message: 'Alguna preferencia enviada ya esta guardada' })

    try {
        const savedTopicsCount = await userModel.saveUserTopics({
            userId: numericUserId, topicIds
        });
        console.log();
        console.log(
            `Se agregó ${savedTopicsCount} temas como preferencias del usuario ${userName} con id ${userId}`
        );
        console.log();
        res.status(201).json({ message: `${savedTopicsCount} temas interes agregados`, addedTopicsCount: savedTopicsCount });
    } catch (err) {
        console.error('Error en saveUserTopics:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }

    // res.status(201).json({ topicIds, userName, userId })
}

module.exports = {
    saveUserTopics
}