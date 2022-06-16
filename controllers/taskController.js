const Task = require('../models/taskModel');

module.exports.showPendingTasks = async (req, res) => {
    if (req.user) {
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        return res.end(JSON.stringify(todos));
    } else {
        console.log('you must be logged in from pending');
        return res.redirect('/');
    }
}

module.exports.showCompletedTasks = async (req, res) => {
    if (req.user) {
        const completed = await Task.find({ $and: [{ completed: true }, { author: req.user._id }] });
        return res.end(JSON.stringify(completed));
    } else {
        console.log('you must be logged in from completed');
        return res.redirect('/');
    }
}

module.exports.newTask = async (req, res) => {
    const { description } = req.body;
    if (req.user) {
        const task = new Task({ description, completed: false, author: req.user._id });
        await task.save();
    } else {
        console.log('you must be logged in from newTask');
    }
    let redir = { redirect: null };
    return res.json(redir);
}

module.exports.deleteTask = async (req, res) => {
    if (req.user) {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
    } else {
        console.log('you must be logged in from deleteTask');
    }
    res.redirect('/');
}

module.exports.completeTask = async (req, res) => {
    if (req.user) {
        const { id } = req.params;
        await Task.findByIdAndUpdate(id, { $set: { completed: true } });
    } else {
        console.log('you must be logged in from completeTask');
    }
    res.redirect('/');
}

module.exports.undoComplete = async (req, res) => {
    if (req.user) {
        const { id } = req.params;
        await Task.findByIdAndUpdate(id, { $set: { completed: false } });
    } else {
        console.log('you must be logged in from undoComplete');
    }
    res.redirect('/');
}

module.exports.editTask = async (req, res) => {
    if (req.user) {
        const { id } = req.params;
        const newDescription = req.body.description;
        await Task.findByIdAndUpdate(id, { $set: { description: newDescription } });
    } else {
        console.log('you must be logged in from editTask');
    }
    res.redirect('/')
}