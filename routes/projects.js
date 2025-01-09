const Project = require('../models/Projects');
require('dotenv').config();

module.exports = app => {
    // API to create project
    // Sample Request body :
    // {
    //     "name":"project 1",
    //     "description":"test",
    //     "status":"Not Started",
    //     "priority" : "Low",
    //     "tasks" : [],
    //     "owner" : "668eab32ca45db2f2260f363",
    //     "team" : ["668f7a422a91512aaf3a8c7b"]
    // }
    // Respone:
    app.post('/project/create', async (req, res) => {
        const { name, description, status, priority, tasks, owner, team } = req.body;
        const newProject = new Project({
            name,
            description,
            status,
            priority,
            tasks,
            owner,
            team
        });
        try {
            await newProject.save();
            res.status(201).send({ success: true, message: 'Project created successfully!' });
        } catch (error) {
            res.status(400).send({ success: false, message: 'Error creating project', error });
        }
    });

    // API to get a users projects
    app.get('/project/:id', async (req, res) => {
        const userId = req.params.id;
        try {
            const projects = await Project.find({
                $or: [
                    { owner: userId },
                    { team: userId }
                ]
            });
            res.status(200).send({ success: true,  projects });
        } catch (error) {
            console.error('Error fetching projects:', error); // Log the error for debugging
            res.status(500).send({ success: false, message: 'Error fetching projects', error });
        }

    });
}