const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    project_name: {
        type: String,
        required: true,
        trim: true
    },
    project_type: {
        type: String,
        trim: true
    },
    lead: {
        type: String,
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Project = mongoose.model("Project", projectSchema);
module.exports = Project;