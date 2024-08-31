const User = require('../models/User');
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = app => {

    // TODO : add JWT auth
    // TODO: sessions
    // Register a new user
    // 
    app.post('/register', async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;
        const existingUser = await User.findOne({ email });
        const saltRounds = 10;

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        } else {
            if (password != confirmPassword) {
                return res.status(400).json({ success: false, message: "Passwords do not match" });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        console.log("error while salting");
                        return res.status(500).json({ success: false, message: "Internal server error" });
                    }
                    bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) {
                            console.log("error while hashing");
                            return res.status(500).json({ success: false, message: "Internal server error" });
                        }
                        console.log("hashing successful ", hash);

                        try {
                            await User.create({ name, email, password: hash });
                            console.log("User created");
                            res.status(200).json({ success: true, message: "User created" });
                        } catch (error) {
                            console.log("error while creating user", error);
                            res.status(500).json({ success: false, message: "Internal server error" });
                        }
                    });
                });
            }
        }
    });

    // Login 
    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ success: false, message: "User doesn't exist" });
            }
            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).json({ success: false, message: "Incorrect password" });
            }
            const id = user.id;
            console.log(id);
            const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:300});
            console.log(token);
            return res.status(200).json({ auth : true, token: token, success: true, result : user, message: "Success" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });
}
