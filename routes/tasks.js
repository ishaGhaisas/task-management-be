const Task = require('../models/Tasks');
require('dotenv').config();

module.exports = app => {
    // TODO : better error handling

    // API to create a task
    app.post('/task/create', async (req, res) => {
        const { taskName, description, priority, status, category, due, assignedTo, projectId } = req.body;
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

    // API to get all users tasks
    app.get('/task/get/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const tasks = await Task.find({ assignedTo: id });
            console.log(tasks);
            res.status(200).send({ success: true, tasks });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).send({ success: false, message: 'Error fetching tasks', error });
        }
    });

    // API to delete a task with task ID
    app.delete('/task/delete/:taskId', async (req, res) => {
        const taskId = req.params.taskId;
        try {
            const resp = await Task.deleteOne({ _id: taskId });
            if (resp.deletedCount > 0) {
                console.log("Task deleted successfully");
                res.status(200).send({ success: true, message: "Task deleted successfully" });
            } else {
                console.log("No task found with the given ID");
                res.status(404).send({ success: false, message: "Task not found" });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).send({ success: false, message: 'Error deleting task', error });
        }
    });

    // API to update task based on task ID
    app.put('/task/update/:taskId', async (req, res) => {
        const taskId = req.params.taskId;
        const updateData = req.body;
    
        try {            
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                updateData,
                { new: true, runValidators: true }
            );
    
            if (updatedTask) {
                console.log("Task updated successfully");
                res.status(200).send({ success: true, message: "Task updated successfully", task: updatedTask });
            } else {
                console.log("Task not found");
                res.status(404).send({ success: false, message: "Task not found" });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).send({ success: false, message: 'Error updating task', error });
        }
    });
    
}