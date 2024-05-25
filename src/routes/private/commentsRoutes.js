const express = require('express');

const { getAll, save } = require('../../features/comments/commentsController');

const router = express.Router();

router.get('/:comment_type_name/:id', getAll);
router.post('/:comment_type_name/:id', save);

module.exports = router;