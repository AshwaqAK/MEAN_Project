const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task-controller");

// authorization
const auth = require("../middleware/auth")
router.use(auth)

// user create task router
router.post("/createTask", (req, res) => {
    taskController.createTask(req).then(response => {
        res.status(201).send(response);
    }).catch(err => { res.status(500).send(err) });
});

// get user task router
router.get("/getUserTask", (req, res) => {
    taskController.getUserTask(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

// get user task router
router.get("/getProjectTask", (req, res) => {
    taskController.getProjectTask(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

// get user task router
router.put("/updateTask", (req, res) => {
    taskController.updateTask(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

// delete user task router
router.delete("/deleteTask/:taskId", (req, res) => {
    taskController.deleteTask(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

module.exports = router;