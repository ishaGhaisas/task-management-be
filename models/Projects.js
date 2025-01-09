const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        enum: ['Not Started', 'In Progress', 'Completed'], 
    },
    priority: {
        type: String,
        required: false,
        enum: ['Low', 'Medium', 'High'], 
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task',
        required: false
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    }]
}, {
    timestamps: true 
});

module.exports = mongoose.model('Project', projectSchema);
