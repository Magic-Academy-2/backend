const express = require('express');
const { saveUserTopics } = require('../../features/users/usersController')

const router = express.Router();
router.post('/:id/topics', saveUserTopics)

module.exports = router