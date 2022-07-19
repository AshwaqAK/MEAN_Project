const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");

// authorization
const auth = require("../middleware/auth")
router.use(auth)

// user create project router
router.post("/createProject", (req, res) => {
    projectController.createProject(req).then(response => {
        res.status(201).send(response);
    }).catch(err => { res.status(500).send(err) });
});

// get user project router
router.get("/getProject", (req, res) => {
    projectController.getProject(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

// update project router
router.put("/updateProject", (req, res) => {
    projectController.updateProject(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

// delete project router
router.delete("/deleteProject/:projectId", (req, res) => {
    projectController.deleteProject(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});

// delete project router
router.get("/getProjectById", (req, res) => {
    projectController.getProjectById(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});


module.exports = router;