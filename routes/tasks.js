const Task = require('../models/Tasks');
require('dotenv').config();

module.exports = app => {
    app.post('/task/create', async(req, res) => {
        const {taskName, description, priority, status, category, due, assignedTo, projectId} = req.body;
        const newTask = new Task({
            taskName,
            description,
            priority,
            status,
            category,
            due,
            assignedTo,
            projectId
        });
        try {
            await newTask.save();
            res.status(201).send({ success: true, message: 'Task created successfully!' });
        } catch (error) {
            res.status(400).send({ success: false, message: 'Error creating task', error });
        }
    });
}