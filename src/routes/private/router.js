const express = require('express');

const topicsRoutes = require('./topicsRoutes');
const coursesRoutes = require('./coursesRoutes');
const commentsRoutes = require('./commentsRoutes')
const usersRoutes = require('./usersRoutes')

const router = express.Router();

router.use('/topics', topicsRoutes);
router.use('/courses', coursesRoutes);
router.use('/comments', commentsRoutes)
router.use('/users', usersRoutes)

module.exports = router;
