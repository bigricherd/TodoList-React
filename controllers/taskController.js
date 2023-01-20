const Task = require('../models/taskModel');

module.exports.showPendingTasks = async (req, res) => {
    if (req.user) {
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        return res.end(JSON.stringify(todos));
    } else {
        return res.redirect('/');
    }
}

module.exports.showCompletedTasks = async (req, res) => {
    if (req.user) {
        const completed = await Task.find({ $and: [{ completed: true }, { author: req.user._id }] });
        return res.end(JSON.stringify(completed));
    } else {
        return res.redirect('/');
    }
}

module.exports.newTask = async (req, res) => {
    const { description } = req.body;
    let response = { redirect: null, tasks: null }
    if (req.user) {
        const task = new Task({ description, completed: false, author: req.user._id });
        await task.save();
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        response.tasks = todos;
    }
    return res.json(response);
}

module.exports.deleteTask = async (req, res) => {
    let response = { redirect: null, tasks: null }
    if (req.user) {
        const { id, completed } = req.params;
        await Task.findByIdAndDelete(id);
        let todos = null;
        todos = await Task.find({ $and: [{ completed: completed }, { author: req.user._id }] });
        response.tasks = todos;
    }
    return res.json(response)
}

module.exports.completeTask = async (req, res) => {
    let response = { redirect: null, pendingTasks: null, completedTasks: null }
    if (req.user) {
        const { id } = req.params;
        await Task.findByIdAndUpdate(id, { $set: { completed: true } });
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        response.pendingTasks = todos;
        const completed = await Task.find({ $and: [{ completed: true }, { author: req.user._id }] });
        response.completedTasks = completed;
    }
    return res.json(response);
}

module.exports.undoComplete = async (req, res) => {
    let response = { redirect: null, pendingTasks: null, completedTasks: null }
    if (req.user) {
        const { id } = req.params;
        await Task.findByIdAndUpdate(id, { $set: { completed: false } });
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        response.pendingTasks = todos;
        const completed = await Task.find({ $and: [{ completed: true }, { author: req.user._id }] });
        response.completedTasks = completed;
    }
    return res.json(response);
}

module.exports.editTask = async (req, res) => {
    let response = { redirect: null, tasks: null }
    if (req.user) {
        const { id } = req.params;
        const newDescription = req.body.description;
        await Task.findByIdAndUpdate(id, { $set: { description: newDescription } });
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        response.tasks = todos;
    }
    return res.json(response);
}