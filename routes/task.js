const express = require('express');
const router = express.Router();
const { getTasks, createTask, getTask } = require('../controllers/task');

router.get('/', async (req, res) => {
    // TODO: add query parsing and filtering
    return getTasks({}, req, res);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    return getTask({ _id: id }, req, res);
});

router.post('/', async (req, res) => {
    return createTask(req.body, req, res);
});

module.exports = router;