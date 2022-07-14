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
    let response = { redirect: null, tasks: null }
    if (req.user) {
        const task = new Task({ description, completed: false, author: req.user._id });
        await task.save();
        const todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        response.tasks = todos;
    } else {
        console.log('you must be logged in from newTask');
    }
    console.log(response);
    return res.json(response);
}

module.exports.deleteTask = async (req, res) => {
    let response = { redirect: null, tasks: null }
    if (req.user) {
        const { id, completed } = req.params;
        console.log(completed);
        await Task.findByIdAndDelete(id);
        let todos = null;
        todos = await Task.find({ $and: [{ completed: completed }, { author: req.user._id }] });
        // if (completed === true) {
        //     console.log('true branch hit');
        //     todos = await Task.find({ $and: [{ completed: true }, { author: req.user._id }] });
        // } else {
        //     console.log('else branch hit');
        //     todos = await Task.find({ $and: [{ completed: false }, { author: req.user._id }] });
        // }
        response.tasks = todos;
        console.log(response.tasks);
    } else {
        console.log('you must be logged in from deleteTask');
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
    } else {
        console.log('you must be logged in from completeTask');
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
    } else {
        console.log('you must be logged in from undoComplete');
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
    } else {
        console.log('you must be logged in from editTask');
    }
    return res.json(response);
}