const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Peer Review', 'Done'],
        default: 'To Do',
    },
    assignee: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['P0', 'P1', 'P2'],
        default: 'P2',
    },
    dueDate: {
        type: Date,
    },
    reminderDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
