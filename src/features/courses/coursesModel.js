const { pool } = require("../../config/database-mysql");
const { USER_ROLES } = require('../users/userRolesEnum');


const getAllInstructorCoursesStrategy = async (userId) => {
    const query = `
        SELECT 
        c.id, c.name, c.description, c.thumbnail_url, c.users_id, topics.name as topics_name
        FROM courses AS c
        INNER JOIN topics
        ON c.topics_id = topics.id
        WHERE c.users_id = ?;
    `
    return (await pool.query(query, [userId]))[0]

}

const getAllCoursesForStudentByTopicsStrategy = async (userId) => {
    const [userTopics] = await pool.query("SELECT topics_id FROM user_topics WHERE users_id = ?", [userId])

    if (!userTopics.length) {
        const [allCourses] = await pool.query("SELECT * FROM courses");
        return allCourses;
    }

    const queryToGetCoursesForStudentByTopics = `
        SELECT * FROM courses AS c
        WHERE c.topics_id IN (${userTopics.map(t => t.topics_id).join(', ')});
    `
    const [coursesForStudentByTopics] = await pool.query(queryToGetCoursesForStudentByTopics);
    return coursesForStudentByTopics;
}

const GET_ALL_COURSES_MODEL_ERRORS = Object.freeze({
    ADMIN_NOT_IMPLEMENTED: 'Get all courses for admin not implemented yet',
    INVALID_USER_ROLE: 'Invalid user role'
})


const getAllCoursesFactory = (userRole) => {
    console.log({ userRole })
    switch (userRole) {
        case USER_ROLES.ADMIN:
            throw new Error(GET_ALL_COURSES_MODEL_ERRORS.ADMIN_NOT_IMPLEMENTED)
        case USER_ROLES.STUDENT:
            return getAllCoursesForStudentByTopicsStrategy
        case USER_ROLES.INSTRUCTOR:
            return getAllInstructorCoursesStrategy
        default:
            throw new Error(GET_ALL_COURSES_MODEL_ERRORS.INVALID_USER_ROLE)
    }
}



const getAll = async ({ userId, userRole }) => {
    try {
        const getCoursesStrategy = getAllCoursesFactory(userRole)
        const courses = await getCoursesStrategy(userId)
        return courses
    } catch (err) {
        console.error('Error en getAll in model:', err);
        throw err
    }
}


const save = async (name, description, thumbnail_url, users_id, topics_id) => {
    try {
        const query = 'INSERT INTO courses (name, description, thumbnail_url, users_id, topics_id) VALUES (?, ?, ?, ?, ?)';
        const [resp] = await pool.query(query, [name, description, thumbnail_url, users_id, topics_id]);
        return resp;
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


const update = async (name, description, thumbnail_url, users_id, topics_id, id) => {
    try {
        const query = 'UPDATE courses SET name = ?, description = ?, thumbnail_url = ?, users_id = ?, topics_id = ? WHERE id = ?';
        const [resp] = await pool.query(query, [name, description, thumbnail_url, users_id, topics_id, id]);
        return resp;
    } catch (err) {
        console.error('Error en update:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


const remove = async (id) => {
    try {
        const query = 'DELETE FROM courses WHERE id = ?';
        const [resp] = await pool.query(query, [id]);
        return resp;
    } catch (err) {
        console.error('Error en delete:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    getAll,
    save,
    update,
    remove,
    GET_ALL_COURSES_MODEL_ERRORS
}


