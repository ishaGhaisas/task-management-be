const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false,
        enum: ['Low', 'Medium', 'High'], 
    },
    status: {
        type: String,
        required: false,
        enum: ['To Do', 'In Progress', 'Completed'],
    },
    category: {
        type: String,
        required: false
    },
    due: {
        type: Date,
        required: false
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
