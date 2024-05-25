const express = require('express');

const topicsRoutes = require('./topicsRoutes');
const coursesRoutes = require('./coursesRoutes')

const router = express.Router();

router.use('/topics', topicsRoutes);
router.use('/courses', coursesRoutes);

module.exports = router;
