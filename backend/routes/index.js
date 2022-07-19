const userRoutes = require("./user-route");
const projectRoutes = require("./project-route");
const taskRoutes = require("./task-route");

module.exports = (app) => {
    app.use("/api/user", userRoutes);
    app.use("/api/project", projectRoutes);
    app.use("/api/task", taskRoutes);
};