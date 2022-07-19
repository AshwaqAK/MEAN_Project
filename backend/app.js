const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const app = express();

// secure headers
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

const { PORT } = process.env;

mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
});

require("./db/connection");
require("./routes")(app);

app.get("/sketchBrahma", (req, res) => {
    res.status(200).send("Sketch Brahma task is ready to Start");
});

const port = PORT || 3000;
app.listen(port, () =>
    console.info(`Server is running on port ${port}`)
);
module.exports = app;