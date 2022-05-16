const express = require('express');
const router = express.Router();
const tasks = require('../controllers/taskController');
const catchAsync = require('../utils/catchAsync');

// Display all pending tasks
router.get('/pendingTasks', catchAsync(tasks.showPendingTasks));

// Display all completed tasks
router.get('/completedTasks', catchAsync(tasks.showCompletedTasks));

// Add a new task to the list
router.post('/newTask', catchAsync(tasks.newTask));

// Deleting from completed page still redirects to main tasks page -- fix this
router.delete('/tasks/:id', catchAsync(tasks.deleteTask));

router.post('/completeTask/:id', catchAsync(tasks.completeTask));

router.post('/undoComplete/:id', catchAsync(tasks.undoComplete));

router.patch('/tasks/:id', catchAsync(tasks.editTask));

module.exports = router;