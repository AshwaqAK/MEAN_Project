const Task = require("../models/task-model");

// create task
exports.createTask = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.body) return resolve({ message: "Task should not be empty" });
            const task = new Task({
                ...req.body,
                userId: req.user._id,
            });
            await task.save();
            resolve({ message: "Task Created Successfully", task })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// get project task
exports.getProjectTask = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.query.projectId) return resolve({ message: "Project ID is required" })
            const task = await Task.find({
                userId: req.user._id,
                projectId: req.query.projectId
            });
            resolve({ message: "Successfull Get Project Task", task })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// get user all task
exports.getUserTask = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const task = await Task.find({
                userId: req.user._id
            });
            resolve({ message: "Successfull User Task", task })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// update task
exports.updateTask = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.query.taskId) return resolve({ message: "Task ID is required" })
            const task = await Task.findOneAndUpdate({
                _id: req.query.taskId,
                projectId: req.body.projectId
            }, {
                ...req.body
            }, {
                new: true
            });
            resolve({ message: "Successfull Update", task })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// delete task
exports.deleteTask = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.params.taskId) return resolve({ message: "Task ID is required" })
            const task = await Task.findByIdAndDelete({
                _id: req.params.taskId
            });
            resolve({ message: "Successfull Deleted Task", task })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};
