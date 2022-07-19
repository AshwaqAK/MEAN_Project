const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value, min = 8) {
            if (!validator.isLength(value, min)) {
                throw new Error("Password must be atleast 8");
            }
        }
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

// Hiding private data
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

// generating token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    },
        process.env.JWT_SECRET_KEY
    );
    user.tokens = user.tokens.concat({
        token
    });
    await user.save();
    return token;
};

// user login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new Error("email not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("password not matching");
    }
    return user;
};

// Hashing the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;