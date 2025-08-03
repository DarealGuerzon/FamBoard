const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (error) {
    console.error('Error in GET /api/tasks:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, status, assignedTo } = req.body;
    const task = new Task({ title, description, dueDate, status, assignedTo });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error in POST /api/tasks:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
