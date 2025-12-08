const express = require("express");
const authRouter =  express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validations");

// save the user data into database
authRouter.post("/signup", async (req, res) => {
    try {
        // validate the data
        validateSignupData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // create a new instance of user
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });

        await user.save();
        res.send("data save successfully");
    } catch(err) {
        res.status(401).send("Error saving the user - " + err.message);
    }
});

//login
authRouter.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user) {
            throw new Error("Invalid Creditionals");
        } 

        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword) {

            const token = await user.getJwt();
            res.cookie("token", token, {
                expire: new Date(Date.now() + 86400000),
                httpOnly : true});
            
            res.send("Login Successful!!");
        } else {
            throw new Error("Invalid Creditionals");
        }
    } catch(err) {
        res.status(404).send("ERROR! " + err.message);
    }
    
});

//logout
authRouter.post("/logout", async (req,res) => {
    // clear the cookie
    res.clearCookie("token");
    res.send("Logout Successful");
});

module.exports = authRouter;