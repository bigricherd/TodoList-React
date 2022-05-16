const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Task description cannot be empty']
    },
    completed: {
        type: Boolean,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Task', TaskSchema);