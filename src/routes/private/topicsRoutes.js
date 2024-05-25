const express = require('express');

const { getAll, save } = require('../../features/topics/topicsController');

const router = express.Router();

router.get('/', getAll);
router.post('/', save);

module.exports = router;