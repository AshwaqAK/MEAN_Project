const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");

// authorization
const auth = require("../middleware/auth")

// welcome router
router.get("/welcome", (req, res) => {
    UserController.welcome(req).then(response => {
        res.send(response);
    }).catch(err => { res.status(500).send(err) });
});


// user signUp router
router.post("/signUp", (req, res) => {
    UserController.signUp(req).then(response => {
        res.status(201).send(response);
    }).catch(err => { res.status(500).send(err) });
});

// user signIn router
router.post("/signIn", (req, res) => {
    UserController.signIn(req).then(response => {
        res.send(response)
    }).catch(err => res.status(400).send(err))
})

// user logut router
router.get("/logOut", auth, (req, res) => {
    UserController.logOut(req).then(response => {
        res.send(response)
    }).catch(err => res.status(400).send(err))
})

// user logut from all router
router.get("/logOutAll", auth, (req, res) => {
    UserController.logOutAll(req).then(response => {
        res.send(response)
    }).catch(err => res.status(400).send(err))
})


module.exports = router;