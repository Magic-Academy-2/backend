const express = require('express');

const { getAll, save, update, remove } = require('../../features/courses/coursesController');

const router = express.Router();

router.get('/', getAll);
router.post('/', save);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;