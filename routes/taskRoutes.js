const express = require('express');
const router = express.Router();
const tasks = require('../controllers/taskController');
const catchAsync = require('../utils/catchAsync');

// Display all pending tasks
router.get('/pending', catchAsync(tasks.showPendingTasks));

// Display all completed tasks
router.get('/completed', catchAsync(tasks.showCompletedTasks));

// Add a new task to the list
router.post('/new', catchAsync(tasks.newTask));

// Deleting from completed page still redirects to main tasks page -- fix this
router.delete('/:id/:completed', catchAsync(tasks.deleteTask));

router.post('/complete/:id', catchAsync(tasks.completeTask));

router.post('/undoComplete/:id', catchAsync(tasks.undoComplete));

router.patch('/:id', catchAsync(tasks.editTask));

module.exports = router;