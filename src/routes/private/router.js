const express = require('express');

const topicsRoutes = require('./topicsRoutes');

const router = express.Router();

router.use('/topics', topicsRoutes)

module.exports = router;
