const mongoose = require("mongoose");

mongoose.connect(process.env.dbURL).then(() => {
    console.log("Connected to MongoDB database!");
}).catch(err => {
    console.log("MongoDB Connection failed! " + err);
    process.exit(1);
});