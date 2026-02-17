const Task = require('../models/task');  // ✓ Import the already-exported model

async function getTasks(query = '', req, res) {
    try {
        const tasks = await Task.find();
        return res.json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

async function createTask(taskData, req, res) {
    try {
        const task = new Task(taskData);
        const savedTask = await task.save();
        return res.json(savedTask);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getTasks,
    createTask
};