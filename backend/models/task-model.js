const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    employee_name: {
        type: String,
        required: true,
        trim: true
    },
    task_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['high', 'normal', 'low'],
    },
    taskComplete: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;