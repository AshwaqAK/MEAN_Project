const Project = require("../models/project-model");
const Task = require("../models/task-model");

// create project
exports.createProject = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.body) return resolve({ message: "Project should not be empty" });
            const project = new Project({
                ...req.body,
                userId: req.user._id,
            });
            await project.save();
            resolve({ message: "Project Created Successfully", project })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// get project
exports.getProject = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await Project.find({
                userId: req.user._id,
            });
            resolve({ message: "Successfull Get Result", project })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// update project
exports.updateProject = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.query.projectId) return resolve({ message: "Project ID is required" })
            const project = await Project.findOneAndUpdate({
                _id: req.query.projectId,
                userId: req.user._id,
            }, {
                ...req.body
            }, {
                new: true
            });
            resolve({ message: "Successfull Update", project })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// delete project
exports.deleteProject = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.params.projectId) return resolve({ message: "Project ID is required" })
            const project = await Project.findByIdAndDelete({
                _id: req.params.projectId
            });
            const deleteManyTask = await Task.deleteMany({
                projectId: req.params.projectId
            })
            resolve({ message: "Successfull Deleted Project", project, deleteManyTask })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// get project by ID
exports.getProjectById = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const task = await Project.find({
                _id: req.query.id
            });
            resolve({ message: "Successfull Get Result", task })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};