// require controllers
const User = require("../models/user-model");

// welcome API endpoint
exports.welcome = (req) => {
    return new Promise((resolve, reject) => {
        resolve({ message: "Sketch Brahma API Ready" });
        reject({ message: "Setup is not proper" });
    });
};

// user signUp
exports.signUp = (req) => {
    return new Promise(async (resolve, reject) => {
        let realEmail, realPassword, email, password
        try {
            realEmail = req.body.email.split("$");
            email = b64DecodeUnicode(realEmail[0]);
            realPassword = req.body.password.split("$");
            password = b64DecodeUnicode(realPassword[0]);
            const userExist = await User.findOne({ email: email });
            if (userExist) return reject({ error: "User already exists" })
            const user = new User({
                email, password, name: req.body.name
            });
            const token = await user.generateAuthToken();
            resolve({ message: "User signed up successfully", user, token })
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

// user signIn
exports.signIn = (req) => {
    return new Promise(async (resolve, reject) => {
        let realEmail, realPassword, user, token, email, password;
        try {
            realEmail = req.body.email.split("$");
            email = b64DecodeUnicode(realEmail[0]);
            realPassword = req.body.password.split("$");
            password = b64DecodeUnicode(realPassword[0]);
            user = await User.findByCredentials(email, password);
            token = await user.generateAuthToken()
            resolve({ message: "User sign in successfully", user, token })
        } catch (error) {
            reject({ error: error.message })
        }
    })
}

// user logout from current account
exports.logOut = req => {
    return new Promise(async (resolve, reject) => {
        try {
            req.user.tokens = req.user.tokens.filter(token => {
                return token.token !== req.token
            })
            await req.user.save()
            resolve({
                message: 'User logged out'
            })
        } catch (error) {
            reject({
                error: error.message
            })
        }
    })
}

// user logged out from all
exports.logOutAll = req => {
    return new Promise(async (resolve, reject) => {
        try {
            req.user.tokens = [];
            await req.user.save()
            resolve({
                message: 'User logged out from all'
            })
        } catch (error) {
            reject({
                error: error.message
            })
        }
    })
}

// decyrpting the hash data
b64DecodeUnicode;

function b64DecodeUnicode(str) {
    return decodeURIComponent(
        Array.prototype.map
            .call(Buffer.from(str, "base64").toString("ascii"), function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}